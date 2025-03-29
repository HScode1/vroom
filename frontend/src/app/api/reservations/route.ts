import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    // Authentification de l'utilisateur
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupération des données de la requête
    const { carId, appointmentDate, duration, message, deliveryInfo } = await request.json();
    
    // Validation des données
    if (!carId || !appointmentDate || !duration) {
      return NextResponse.json(
        { error: "Données de réservation incomplètes" },
        { status: 400 }
      );
    }

    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Vérification que la voiture existe et est disponible
    const { data: car, error: carError } = await supabase
      .from("cars")
      .select("id, title, seller_id, availability")
      .eq("id", carId)
      .single();

    if (carError || !car) {
      return NextResponse.json(
        { error: "Voiture non trouvée" },
        { status: 404 }
      );
    }

    if (car.availability !== "available") {
      return NextResponse.json(
        { error: "Cette voiture n'est pas disponible à la réservation" },
        { status: 409 }
      );
    }

    // Vérification des conflits de réservation
    const { data: conflictingReservations, error: conflictError } = await supabase
      .from("reservations")
      .select("id")
      .eq("car_id", carId)
      .gte("appointment_date", startTime.toISOString())
      .lte("appointment_date", endTime.toISOString())
      .neq("status", "cancelled");

    if (conflictError) {
      return NextResponse.json(
        { error: "Erreur lors de la vérification des disponibilités" },
        { status: 500 }
      );
    }

    if (conflictingReservations && conflictingReservations.length > 0) {
      return NextResponse.json(
        { error: "Ce créneau horaire est déjà réservé pour cette voiture" },
        { status: 409 }
      );
    }

    // Récupération de l'ID utilisateur dans Supabase à partir de l'ID Clerk
    const { data: userRecord, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", userId)  // Suppose une colonne clerk_id qui stocke l'ID Clerk
      .single();

    if (userError || !userRecord) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé dans notre base de données" },
        { status: 404 }
      );
    }

    // Insertion de la réservation (seulement avec les champs existants dans le schéma)
    console.log("Données de réservation simplifiées:", {
      car_id: carId,
      user_id: userRecord.id,  // Utiliser l'UUID Supabase, pas l'ID Clerk
      appointment_date: startTime.toISOString(),
      duration,
      status: "confirmed"
    });

    const { data: reservation, error: insertError } = await supabase
      .from("reservations")
      .insert({
        car_id: carId,
        user_id: userRecord.id,  // Utiliser l'UUID Supabase, pas l'ID Clerk
        appointment_date: startTime.toISOString(),
        duration: parseInt(String(duration), 10),
        status: "confirmed"
      })
      .select()
      .single();

    if (insertError) {
      console.error("Erreur lors de la création de la réservation:", insertError);
      return NextResponse.json(
        { error: "Erreur lors de la création de la réservation: " + insertError.message },
        { status: 500 }
      );
    }

    // Mise à jour de l'availability de la voiture
    const { error: updateError } = await supabase
      .from("cars")
      .update({ availability: "reserved" })
      .eq("id", carId);

    if (updateError) {
      console.error("Erreur lors de la mise à jour de l'availability de la voiture:", updateError);
      // On ne renvoie pas d'erreur au client car la réservation a déjà été créée
    }

    // Récupération des informations pour les emails
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("email")
      .eq("id", userRecord.id)
      .single();

    const { data: sellerData, error: sellerError } = await supabase
      .from("users")
      .select("email")
      .eq("id", car.seller_id)
      .single();

    // Envoi des emails de confirmation (asynchrone)
    try {
      // Email au client
      if (userData?.email) {
        await fetch("/api/reservations/notify-client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.email,
            carTitle: car.title,
            appointmentDate: startTime.toISOString(),
            duration,
            reservationId: reservation.id
          }),
        });
      }

      // Email au vendeur
      if (sellerData?.email) {
        await fetch("/api/reservations/notify-seller", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: sellerData.email,
            carTitle: car.title,
            appointmentDate: startTime.toISOString(),
            duration,
            reservationId: reservation.id,
            buyerEmail: userData?.email
          }),
        });
      }
    } catch (emailError) {
      console.error("Erreur lors de l'envoi des emails de confirmation:", emailError);
      // On ne renvoie pas d'erreur au client car la réservation a déjà été créée
    }

    return NextResponse.json(
      { 
        message: "Réservation créée avec succès",
        reservationId: reservation.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur inattendue:", error);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}