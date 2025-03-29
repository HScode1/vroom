import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendOwnerEmail, sendClientEmail, addToCalendar } from '@/services/appointmentService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { date, time, name, email, phone, message, vroomer, duration, motorisation, budget } = data;

    // Validation côté serveur
    if (!date || !time || !name || !email) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' }, 
        { status: 400 }
      );
    }

    // Format the date and time into a single ISO string
    const dateTimeString = `${date}T${time}:00`;
    const dateTime = new Date(dateTimeString);

    // Stocker dans Supabase
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert([
        { 
          client_name: name, 
          client_email: email, 
          client_phone: phone || null, 
          message: message || null,
          appointment_date: dateTime.toISOString(),
          vroomer: vroomer || null,
          duration: duration ? parseInt(duration, 10) : null,
          motorisation: motorisation || null,
          budget: budget || null,
          created_at: new Date().toISOString(),
          status: 'confirmed'
        }
      ])
      .select('id')
      .single();

    if (dbError) {
      console.error('Erreur Supabase:', dbError);
      return NextResponse.json(
        { error: 'Erreur serveur lors de l\'enregistrement du rendez-vous' }, 
        { status: 500 }
      );
    }

    // Automatisations
    try {
      // Préparer les données pour les services d'automatisation
      const appointmentData = { 
        date, 
        time, 
        name, 
        email, 
        phone, 
        message,
        vroomer,
        duration
      };

      // Envoyer un email au propriétaire
      await sendOwnerEmail(appointmentData);
      
      // Ajouter au calendrier
      await addToCalendar(appointmentData);
      
      // Envoyer un email de confirmation au client
      await sendClientEmail(appointmentData);

      return NextResponse.json(
        { 
          message: 'Rendez-vous pris avec succès',
          appointmentId: appointment.id
        }, 
        { status: 200 }
      );
    } catch (error) {
      console.error('Erreur lors des automatisations:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la prise de rendez-vous' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return NextResponse.json(
      { error: 'Erreur serveur inattendue' }, 
      { status: 500 }
    );
  }
}
