import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Interface pour les données de réservation
interface ReservationData {
  email: string;
  carTitle: string;
  appointmentDate: string;
  duration: number;
  reservationId: string;
  buyerEmail?: string;
  deliveryInfo?: {
    type: 'pickup' | 'delivery';
    location?: {
      name: string;
      address: string;
      postalCode: string;
      distance: string;
    } | null;
    postalCode?: string;
    price?: number;
  } | null;
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
    const { email, carTitle, appointmentDate, duration, reservationId, buyerEmail, deliveryInfo } = data;

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
      summary: `Nouvelle réservation pour ${carTitle}`,
      description: `Un client a réservé votre voiture ${carTitle}.${buyerEmail ? ` Email du client: ${buyerEmail}` : ''}${deliveryInfo ? ` Type de livraison: ${deliveryInfo.type === 'pickup' ? 'Retrait en agence' : 'Livraison à domicile'}` : ''}`,
      location: deliveryInfo?.type === 'pickup' && deliveryInfo?.location ? `${deliveryInfo.location.name}, ${deliveryInfo.location.address}` : 'Vroom Showroom',
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
    const reservationDetailsUrl = `${baseUrl}/dashboard/reservations/${reservationId}`;

    // Contenu de l'email
    const emailSubject = `Nouvelle réservation pour ${carTitle}`;
    const textContent = `
Bonjour,

Un client a réservé votre voiture ${carTitle} !

DÉTAILS DE LA RÉSERVATION :
- Date : ${formattedDate}
- Heure : ${formattedTime}
- Durée : ${duration} minutes
- Voiture : ${carTitle}
${buyerEmail ? `- Email du client : ${buyerEmail}` : ''}
${deliveryInfo ? `
DÉTAILS DE LIVRAISON :
- Type : ${deliveryInfo.type === 'pickup' ? 'Retrait en agence' : 'Livraison à domicile'}
${deliveryInfo.type === 'pickup' && deliveryInfo.location ? `- Agence : ${deliveryInfo.location.name}
- Adresse : ${deliveryInfo.location.address}, ${deliveryInfo.location.postalCode}` : ''}
${deliveryInfo.type === 'delivery' ? `- Code postal : ${deliveryInfo.postalCode}
- Prix de livraison : ${deliveryInfo.price || 0}€` : ''}` : ''}

Un fichier d'invitation (.ics) est joint pour l'ajouter facilement à votre calendrier.

Pour gérer cette réservation, visitez : ${reservationDetailsUrl}

Merci d'utiliser Vroom pour vendre votre voiture !
L'équipe Vroom

---
Vroom | Le meilleur moyen de vendre votre voiture
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
            <h1>Nouvelle Réservation</h1>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Un client a réservé votre voiture <strong>${carTitle}</strong> !</p>
            
            <div class="reservation-details">
                <h3>Détails de la réservation :</h3>
                <p><strong>Date :</strong> ${formattedDate}</p>
                <p><strong>Heure :</strong> ${formattedTime}</p>
                <p><strong>Durée :</strong> ${duration} minutes</p>
                <p><strong>Voiture :</strong> ${carTitle}</p>
                ${buyerEmail ? `<p><strong>Email du client :</strong> ${buyerEmail}</p>` : ''}
                ${deliveryInfo ? `
                <h3>Détails de livraison :</h3>
                <p><strong>Type :</strong> ${deliveryInfo.type === 'pickup' ? 'Retrait en agence' : 'Livraison à domicile'}</p>
                ${deliveryInfo.type === 'pickup' && deliveryInfo.location ? `
                <p><strong>Agence :</strong> ${deliveryInfo.location.name}</p>
                <p><strong>Adresse :</strong> ${deliveryInfo.location.address}, ${deliveryInfo.location.postalCode}</p>
                ` : ''}
                ${deliveryInfo.type === 'delivery' ? `
                <p><strong>Code postal :</strong> ${deliveryInfo.postalCode}</p>
                <p><strong>Prix de livraison :</strong> ${deliveryInfo.price || 0}€</p>
                ` : ''}
                ` : ''}
            </div>
            
            <p>Un fichier d'invitation (.ics) est joint pour l'ajouter facilement à votre calendrier.</p>
            
            <p>
                <a href="${reservationDetailsUrl}" class="button">Gérer cette réservation</a>
            </p>
            
            <p>Merci d'utiliser Vroom pour vendre votre voiture !</p>
            <p>L'équipe Vroom</p>
        </div>
        <div class="footer">
            <p>Vroom | Le meilleur moyen de vendre votre voiture</p>
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
        { error: 'Erreur lors de l\'envoi de l\'email de notification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email de notification envoyé avec succès', id: emailData?.id },
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
