import { supabase } from '../lib/supabase';

export interface AppointmentData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  vroomer?: string;
  duration?: string;
  motorisation?: string;
  budgetRange?: string;
  budgetCustom?: string;
}

/**
 * Creates a new appointment in the database
 */
export async function createAppointment(appointmentData: AppointmentData): Promise<string> {
  try {
    const dateTimeString = `${appointmentData.date}T${appointmentData.time}:00`;
    const dateTime = new Date(dateTimeString); // Attention au fuseau horaire ici si nécessaire

    // Déterminer la valeur du budget à insérer
    const budgetValue = appointmentData.budgetCustom || appointmentData.budgetRange || null;

    const appointmentInsertData = {
      client_name: appointmentData.name,
      client_email: appointmentData.email,
      client_phone: appointmentData.phone || null,
      message: appointmentData.message || null,
      appointment_date: dateTime.toISOString(), // Envoie en UTC, ce qui est généralement bien pour les BDD
      vroomer: appointmentData.vroomer || null,
      duration: appointmentData.duration ? parseInt(appointmentData.duration, 10) : null,
      motorisation: appointmentData.motorisation || null,
      // Utiliser la valeur déterminée
      budget: budgetValue,
      created_at: new Date().toISOString(),
      status: 'confirmed'
    };

    console.log("Données d'insertion Supabase:", appointmentInsertData); // Log pour débogage

    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert([appointmentInsertData])
      .select('id')
      .single();

    if (appointmentError) {
      // Log amélioré
      console.error('Appointment insertion failed:', JSON.stringify(appointmentError, null, 2));
      // Erreur plus détaillée
      throw new Error(`Appointment insertion failed: ${appointmentError.message || JSON.stringify(appointmentError)}`);
    }

    console.log('Appointment inserted successfully:', appointment.id);
    return appointment.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    // Relancer l'erreur pour qu'elle soit attrapée plus haut (dans processAppointment)
    throw error;
  }
}

/**
 * Sends an email to the owner with appointment details
 */
export async function sendOwnerEmail(appointmentData: AppointmentData): Promise<void> {
  try {
    // In a real implementation, this would use a service like SendGrid or Nodemailer
    // For now, we'll just simulate the email sending with a console log and API call
    
    const { date, time, name, email, phone, message, vroomer, duration } = appointmentData;
    
    // Call our API endpoint that will handle the actual email sending
    const response = await fetch('/api/appointments/notify-owner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        time,
        name,
        email,
        phone,
        message,
        vroomer,
        duration
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send owner email');
    }
    
    console.log('Owner email sent successfully');
  } catch (error) {
    console.error('Error sending owner email:', error);
    throw error;
  }
}

/**
 * Adds the appointment to the owner's calendar
 */
export async function addToCalendar(appointmentData: AppointmentData): Promise<void> {
  try {
    // In a real implementation, this would use Google Calendar API
    // For now, we'll just simulate the calendar addition with a console log and API call
    
    const { date, time, name, email, phone, message, vroomer, duration } = appointmentData;
    
    // Call our API endpoint that will handle the actual calendar event creation
    const response = await fetch('/api/appointments/add-to-calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        time,
        name,
        email,
        phone,
        message,
        vroomer,
        duration
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to calendar');
    }
    
    console.log('Appointment added to calendar successfully');
  } catch (error) {
    console.error('Error adding to calendar:', error);
    throw error;
  }
}

/**
 * Sends a confirmation email to the client
 */
export async function sendClientEmail(appointmentData: AppointmentData): Promise<void> {
  try {
    // In a real implementation, this would use a service like SendGrid or Nodemailer
    // For now, we'll just simulate the email sending with a console log and API call
    
    const { date, time, name, email, phone, message, vroomer, duration } = appointmentData;
    
    // Call our API endpoint that will handle the actual email sending
    const response = await fetch('/api/appointments/notify-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        time,
        name,
        email,
        phone,
        message,
        vroomer,
        duration
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send client email');
    }
    
    console.log('Client email sent successfully');
  } catch (error) {
    console.error('Error sending client email:', error);
    throw error;
  }
}

/**
 * Process a complete appointment - store it, notify owner, add to calendar, and confirm to client
 */
export async function processAppointment(appointmentData: AppointmentData): Promise<string> {
  try {
    // Step 1: Create the appointment in the database
    const appointmentId = await createAppointment(appointmentData);
    
    // Step 2: Send email to owner
    await sendOwnerEmail(appointmentData);
    
    // Step 3: Add to calendar
    await addToCalendar(appointmentData);
    
    // Step 4: Send confirmation email to client
    await sendClientEmail(appointmentData);
    
    return appointmentId;
  } catch (error) {
    console.error('Error processing appointment:', error);
    throw error;
  }
}
