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
    const { reservationId } = await request.json();
    
    if (!reservationId) {
      return NextResponse.json(
        { error: "ID de réservation manquant" },
        { status: 400 }
      );
    }

    // Vérification que la réservation existe et appartient à l'utilisateur
    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .select("id, car_id, status")
      .eq("id", reservationId)
      .eq("user_id", userId)
      .single();

    if (reservationError || !reservation) {
      return NextResponse.json(
        { error: "Réservation non trouvée ou non autorisée" },
        { status: 404 }
      );
    }

    if (reservation.status === "cancelled") {
      return NextResponse.json(
        { error: "Cette réservation est déjà annulée" },
        { status: 400 }
      );
    }

    // Mise à jour du statut de la réservation
    const { error: updateError } = await supabase
      .from("reservations")
      .update({ status: "cancelled" })
      .eq("id", reservationId);

    if (updateError) {
      return NextResponse.json(
        { error: "Erreur lors de l'annulation de la réservation" },
        { status: 500 }
      );
    }

    // Mise à jour du statut de la voiture pour la rendre à nouveau disponible
    const { error: carUpdateError } = await supabase
      .from("cars")
      .update({ status: "available" })
      .eq("id", reservation.car_id);

    if (carUpdateError) {
      console.error("Erreur lors de la mise à jour du statut de la voiture:", carUpdateError);
      // On ne renvoie pas d'erreur au client car l'annulation a déjà été effectuée
    }

    // Notification par email (optionnel, à implémenter si nécessaire)
    // ...

    return NextResponse.json(
      { message: "Réservation annulée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur inattendue:", error);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue" },
      { status: 500 }
    );
  }
}
