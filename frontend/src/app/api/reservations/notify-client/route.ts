import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Interface pour les données de réservation
interface ReservationData {
  email: string;
  carTitle: string;
  appointmentDate: string;
  duration: number;
  reservationId: string;
}

// Initialisation de Resend avec la clé API
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Vérification et validation des données
    if (!request.body) {
      return NextResponse.json({ error: 'Corps de requête manquant' }, { status: 400 });
    }

    const data: ReservationData = await request.json();
    const { email, carTitle, appointmentDate, duration, reservationId } = data;

    // Validation basique
    if (!email || !carTitle || !appointmentDate || !duration || !reservationId) {
      return NextResponse.json(
        { error: 'Données de réservation incomplètes' },
        { status: 400 }
      );
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Format d\'email invalide' }, { status: 400 });
    }

    // Formatage de la date et de l'heure
    const appointmentDateTime = new Date(appointmentDate);
    if (isNaN(appointmentDateTime.getTime())) {
      return NextResponse.json({ error: 'Format de date invalide' }, { status: 400 });
    }

    const formattedDate = appointmentDateTime.toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = appointmentDateTime.toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit', hour12: false
    });

    // Génération du fichier iCal
    const iCalContent = generateICalEvent({
      summary: `Réservation pour ${carTitle}`,
      description: `Votre réservation pour la voiture ${carTitle} a été confirmée.`,
      location: 'Vroom Showroom',
      startTime: appointmentDateTime,
      endTime: new Date(appointmentDateTime.getTime() + duration * 60000),
      attendeeName: email.split('@')[0], // Utilisation de la partie locale de l'email comme nom
      attendeeEmail: email
    });

    // Configuration de l'email
    const senderEmail = process.env.RESEND_FROM_EMAIL;
    if (!senderEmail) {
      console.error("RESEND_FROM_EMAIL non défini dans les variables d'environnement");
      return NextResponse.json(
        { error: 'Configuration du serveur incomplète' },
        { status: 500 }
      );
    }

    // En développement, rediriger les emails vers une adresse de test
    const isDevelopment = process.env.NODE_ENV === 'development';
    const recipientEmail = isDevelopment ? 'myvroomfr@gmail.com' : email;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const cancelUrl = `${baseUrl}/reservations/cancel?id=${reservationId}`;

    // Contenu de l'email
    const emailSubject = `Votre réservation pour ${carTitle} est confirmée !`;
    const textContent = `
Bonjour,

Votre réservation pour la voiture ${carTitle} a été confirmée !

DÉTAILS DE LA RÉSERVATION :
- Date : ${formattedDate}
- Heure : ${formattedTime}
- Durée : ${duration} minutes
- Voiture : ${carTitle}

Un fichier d'invitation (.ics) est joint pour l'ajouter facilement à votre calendrier.

Pour annuler votre réservation, visitez : ${cancelUrl}

Nous vous remercions pour votre confiance !
L'équipe Vroom

---
Vroom | Le meilleur moyen d'acheter votre prochaine voiture
© ${new Date().getFullYear()} Vroom - Tous droits réservés
`;

    // Contenu HTML de l'email
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${emailSubject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #333;
            color: #C8EC66;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .reservation-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #C8EC66;
            color: #333;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Réservation Confirmée</h1>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Votre réservation pour la voiture <strong>${carTitle}</strong> a été confirmée !</p>
            
            <div class="reservation-details">
                <h3>Détails de la réservation :</h3>
                <p><strong>Date :</strong> ${formattedDate}</p>
                <p><strong>Heure :</strong> ${formattedTime}</p>
                <p><strong>Durée :</strong> ${duration} minutes</p>
                <p><strong>Voiture :</strong> ${carTitle}</p>
            </div>
            
            <p>Un fichier d'invitation (.ics) est joint pour l'ajouter facilement à votre calendrier.</p>
            
            <p>
                <a href="${cancelUrl}" class="button">Annuler ma réservation</a>
            </p>
            
            <p>Nous vous remercions pour votre confiance !</p>
            <p>L'équipe Vroom</p>
        </div>
        <div class="footer">
            <p>Vroom | Le meilleur moyen d'acheter votre prochaine voiture</p>
            <p>&copy; ${new Date().getFullYear()} Vroom - Tous droits réservés</p>
        </div>
    </div>
</body>
</html>
`;

    // Envoi de l'email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Vroom <${senderEmail}>`,
      to: [recipientEmail],
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: 'reservation.ics',
          content: Buffer.from(iCalContent).toString('base64'),
          contentType: 'text/calendar',
        },
      ],
    });

    if (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email de confirmation' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email de confirmation envoyé avec succès', id: emailData?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return NextResponse.json(
      { error: 'Une erreur inattendue est survenue' },
      { status: 500 }
    );
  }
}

// Fonction pour générer un événement iCal
interface ICalEventParams {
  summary: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  attendeeName: string;
  attendeeEmail: string;
}

function generateICalEvent(params: ICalEventParams): string {
  const { summary, description, location, startTime, endTime, attendeeName, attendeeEmail } = params;
  
  const formatDateForICal = (date: Date): string => {
    return date.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
  };
  
  const organizerEmail = process.env.RESEND_FROM_EMAIL || 'noreply@vroom.com';
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vroom//Reservation//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${attendeeEmail}@vroom.com`,
    `DTSTAMP:${formatDateForICal(new Date())}`,
    `DTSTART:${formatDateForICal(startTime)}`,
    `DTEND:${formatDateForICal(endTime)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `ORGANIZER;CN=Vroom:mailto:${organizerEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${attendeeName}:mailto:${attendeeEmail}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Rappel: Réservation Vroom',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
