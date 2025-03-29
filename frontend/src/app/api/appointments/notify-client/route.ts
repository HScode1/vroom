import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Define an interface for the expected request body data for better type safety
interface AppointmentData {
    date: string;
    time: string;
    name: string;
    email: string;
    phone?: string; // Optional
    message?: string; // Optional
    vroomer: 'zinedine' | 'lopez' | string; // More specific type if possible, or string for flexibility
    duration?: string; // Optional, defaults to '60'
}

// Initialize Resend with your API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export async function POST(request: Request): Promise<NextResponse> {
    try {
        // --- 1. Parse and Validate Request Data ---
        if (!request.body) {
            return NextResponse.json({ error: 'Request body is missing' }, { status: 400 });
        }

        const data: AppointmentData = await request.json();
        const { date, time, name, email, phone, message, vroomer, duration = '60' } = data; // Default duration to '60'

        // Basic validation
        if (!date || !time || !name || !email || !vroomer) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants (date, time, name, email, vroomer)' },
                { status: 400 }
            );
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json({ error: 'Format d\'email invalide' }, { status: 400 });
        }

        // --- 2. Data Processing and Formatting ---
        let appointmentDate: Date;
        try {
            appointmentDate = new Date(`${date}T${time}`);
            if (isNaN(appointmentDate.getTime())) {
                throw new Error('Invalid date/time format');
            }
        } catch (e) {
            return NextResponse.json({ error: 'Format de date ou d\'heure invalide' }, { status: 400 });
        }

        const formattedDate = appointmentDate.toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const formattedTime = appointmentDate.toLocaleTimeString('fr-FR', {
            hour: '2-digit', minute: '2-digit', hour12: false // Use 24-hour format
        });

        const getFullVroomerName = (vroomerCode: string): string => {
            switch (vroomerCode?.toLowerCase()) {
                case 'zinedine': return 'Zinedine Aberkane';
                case 'lopez': return 'Michel Lopez';
                default: return 'Conseiller Vroom';
            }
        };
        const vroomerFullName = getFullVroomerName(vroomer);

        const durationMinutes = parseInt(duration, 10);
        if (isNaN(durationMinutes) || durationMinutes <= 0) {
            return NextResponse.json({ error: 'Durée invalide' }, { status: 400 });
        }

        // --- 3. Generate iCal Event ---
        const generateICalEvent = (): string => {
            const eventStart: Date = appointmentDate;
            const eventEnd: Date = new Date(eventStart.getTime() + durationMinutes * 60000);
            const formatDateForICal = (dateToFormat: Date): string => {
                return dateToFormat.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
            };
            const organizerEmail = process.env.RESEND_FROM_EMAIL || 'noreply@vroom.com';
            return [
                'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Vroom//Appointment//FR',
                'CALSCALE:GREGORIAN', 'METHOD:REQUEST', 'BEGIN:VEVENT',
                `UID:${Date.now()}-${email}@vroom.com`, `DTSTAMP:${formatDateForICal(new Date())}`,
                `DTSTART:${formatDateForICal(eventStart)}`, `DTEND:${formatDateForICal(eventEnd)}`,
                `SUMMARY:Rendez-vous Vroom avec ${vroomerFullName}`,
                `DESCRIPTION:Rendez-vous pour discuter de votre projet automobile.\\n${message ? 'Message du client: ' + message.replace(/\n/g, '\\n') : ''}\\nTéléphone: ${phone || 'Non fourni'}`,
                'LOCATION:Vroom Showroom, 123 Avenue des Voitures, 75000 Paris', // Add address if available
                `ORGANIZER;CN=Vroom:mailto:${organizerEmail}`,
                `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${name}:mailto:${email}`,
                'STATUS:CONFIRMED', 'SEQUENCE:0', 'BEGIN:VALARM', 'TRIGGER:-PT30M',
                'ACTION:DISPLAY', 'DESCRIPTION:Rappel: Rendez-vous Vroom', 'END:VALARM',
                'END:VEVENT', 'END:VCALENDAR'
            ].join('\r\n');
        };

        const iCalContent = generateICalEvent();

        // --- 4. Prepare Email Content (Enhanced UI) ---
        const senderEmail = process.env.RESEND_FROM_EMAIL;
        if (!senderEmail) {
            console.error("CRITICAL: RESEND_FROM_EMAIL environment variable is not set.");
            return NextResponse.json({ error: 'Configuration du serveur incomplete (email expediteur)' }, { status: 500 });
        }

        const isDevelopment = process.env.NODE_ENV === 'development';
        const recipientEmail = isDevelopment ? 'myvroomfr@gmail.com' : email;

        // **IMPORTANT:** Replace 'http://localhost:3000' with your *publicly accessible* base URL
        //                when deployed, or use a CDN/image hosting service URL.
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'; // Example: https://www.votre-site-vroom.com

        const emailSubject = `Votre rendez-vous Vroom du ${formattedDate} est confirmé !`;
        const textContent = `
Bonjour ${name},

Votre rendez-vous chez Vroom est confirmé !

DÉTAILS DU RENDEZ-VOUS :
- Date : ${formattedDate}
- Heure : ${formattedTime}
- Durée : ${durationMinutes} minutes
- Avec : ${vroomerFullName}
${phone ? `- Téléphone : ${phone}` : ''}
${message ? `- Votre message : ${message}` : ''}

Un fichier d'invitation (.ics) est joint pour l'ajouter facilement à votre calendrier.

Besoin de modifier ou d'annuler ?
Contactez-nous au 01 23 45 67 89 ou répondez à cet e-mail.

Gérez votre rendez-vous en ligne : ${baseUrl}/mon-compte/rendez-vous

Nous sommes impatients de vous accueillir !
L'équipe Vroom

---
Vroom Showroom | 123 Avenue des Voitures, 75000 Paris | 01 23 45 67 89 | ${baseUrl}
© ${new Date().getFullYear()} Vroom - Tous droits réservés
Politique de confidentialité | Conditions d'utilisation
`;

        // Enhanced HTML Content
        const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${emailSubject}</title>
    <style>
        /* Reset & Fondamentaux */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f0f2f5; font-family: 'Arial', sans-serif; }
        
        /* Conteneur principal */
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
            border-top: 5px solid #C8EC66; /* Bordure supérieure verte Vroom */
        }
        
        /* En-tête avec alerte visuelle */
        .header {
            background-color: #333333; /* Gris foncé remplaçant le bleu */
            padding: 25px 20px;
            text-align: center;
            border-bottom: 4px solid #C8EC66; /* Bordure verte épaissie */
            position: relative; /* Pour les éléments décoratifs */
        }
        .header::before, .header::after {
            content: '';
            position: absolute;
            bottom: -4px;
            width: 30px;
            height: 30px;
            background-color: #C8EC66;
            z-index: 1;
        }
        .header::before {
            left: 20px;
            clip-path: circle(50% at center);
        }
        .header::after {
            right: 20px;
            clip-path: circle(50% at center);
        }
        .header img {
            max-width: 180px; /* Logo plus grand */
            height: auto;
            position: relative;
            z-index: 2;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .header-alert {
            background-color: #4CAF50; /* Vert standard pour la notification */
            color: white;
            padding: 12px 15px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            letter-spacing: 0.5px;
            border-bottom: 3px solid rgba(0,0,0,0.1); /* Ombre subtile */
        }
        
        /* Contenu principal */
        .content {
            padding: 30px;
            color: #333333;
            line-height: 1.6;
            position: relative;
        }
        .content::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background-color: rgba(200, 236, 102, 0.1); /* Vroom vert très léger */
            border-radius: 0 0 0 100px;
            z-index: -1;
        }
        .content h2 {
            color: #4a4a4a; /* Gris foncé au lieu du bleu */
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 25px;
            border-bottom: 3px solid #C8EC66; /* Utilisation de la couleur Vroom */
            padding-bottom: 12px;
            display: inline-block; /* Pour que la bordure ne prenne que la largeur du texte */
        }
        
        /* Sections d'informations */
        .info-section {
            margin-bottom: 30px;
            position: relative;
        }
        .info-section h3 {
            color: #4a4a4a; /* Gris foncé au lieu du bleu */
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 18px;
            position: relative;
            padding-left: 22px;
        }
        .info-section h3:before {
            content: '';
            position: absolute;
            left: 0;
            top: 5px;
            width: 12px;
            height: 12px;
            background-color: #C8EC66; /* Utilisation de la couleur Vroom */
            border-radius: 50%;
            border: 2px solid #4a4a4a; /* Gris au lieu du bleu */
        }
        
        /* Carte d'informations client */
        .client-card {
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            display: flex;
            align-items: flex-start;
            margin-bottom: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border-left: 4px solid #C8EC66; /* Bordure verte Vroom */
        }
        .client-avatar {
            width: 64px;
            height: 64px;
            background-color: #4a4a4a; /* Gris foncé au lieu du bleu */
            color: #C8EC66; /* Texte vert Vroom */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 18px;
            font-size: 26px;
            font-weight: bold;
            box-shadow: 0 3px 5px rgba(0,0,0,0.1);
        }
        .client-info {
            flex: 1;
        }
        .client-name {
            font-size: 20px;
            font-weight: bold;
            color: #4a4a4a; /* Gris foncé au lieu du bleu */
            margin: 0 0 8px 0;
        }
        .client-contact {
            margin: 6px 0;
            color: #5e5e5e; /* Gris moyen */
        }
        .client-contact a {
            color: #4a4a4a; /* Gris foncé au lieu du bleu */
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px dotted #C8EC66;
        }
        
        /* Boîte d'informations du rendez-vous */
        .appointment-box {
            background-color: #f6f6f6; /* Gris très léger au lieu du bleu léger */
            border-left: 5px solid #C8EC66; /* Utilisation de la couleur Vroom */
            padding: 25px;
            border-radius: 0 10px 10px 0;
            margin-bottom: 30px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.04);
        }
        .appointment-detail {
            display: flex;
            margin-bottom: 18px;
            position: relative;
        }
        .appointment-detail:not(:last-child)::after {
            content: '';
            position: absolute;
            bottom: -9px;
            left: 40px;
            right: 0;
            height: 1px;
            background: linear-gradient(to right, rgba(200, 236, 102, 0.5), transparent);
        }
        .appointment-detail:last-child {
            margin-bottom: 0;
        }
        .detail-icon {
            width: 24px;
            margin-right: 16px;
            text-align: center;
            color: #4a4a4a; /* Gris foncé au lieu du bleu */
            font-size: 18px;
        }
        .detail-content {
            flex: 1;
        }
        .detail-label {
            font-weight: bold;
            color: #4a4a4a; /* Gris foncé au lieu du bleu */
            margin: 0;
            font-size: 15px;
        }
        .detail-value {
            margin: 4px 0 0 0;
            color: #555;
            font-size: 16px;
        }
        
        /* Message du client */
        .client-message {
            background-color: #f9fbef; /* Teinte très légère de vert */
            border-left: 5px solid #C8EC66; /* Utilisation de la couleur Vroom */
            padding: 18px 22px;
            border-radius: 0 10px 10px 0;
            font-style: italic;
            color: #5d5d5d; /* Gris au lieu du marron */
            margin-top: 20px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.03);
        }
        .client-message::before {
            content: '"';
            font-size: 48px;
            color: rgba(200, 236, 102, 0.3);
            line-height: 0;
            position: relative;
            top: 15px;
            left: -5px;
        }
        .client-message p {
            margin: 0;
            line-height: 1.7;
            position: relative;
        }
        
        /* Bouton d'action */
        .cta-button {
            text-align: center;
            margin: 35px 0 25px 0;
        }
        .cta-button a {
            display: inline-block;
            background-color: #C8EC66; /* Utilisation de la couleur Vroom */
            color: #333333; /* Gris foncé au lieu du bleu */
            font-weight: bold;
            padding: 14px 35px;
            text-decoration: none;
            border-radius: 30px; /* Bouton plus arrondi */
            font-size: 16px;
            transition: background-color 0.3s, transform 0.2s;
            box-shadow: 0 4px 10px rgba(200, 236, 102, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 2px solid #C8EC66;
        }
        .cta-button a:hover {
            background-color: #d9f587; /* Version plus claire au survol */
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(200, 236, 102, 0.4);
        }
        
        /* Pied de page */
        .footer {
            background-color: #333333; /* Gris foncé au lieu du bleu */
            padding: 25px;
            text-align: center;
            font-size: 13px;
            color: #e0e0e0; /* Texte plus clair pour contraste */
            border-top: 3px solid #C8EC66; /* Bordure verte Vroom */
            position: relative;
        }
        .footer::before {
            content: '';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 30px;
            background-color: #C8EC66;
            border-radius: 50%;
            z-index: 1;
        }
        .footer p {
            margin: 5px 0;
            position: relative;
            z-index: 2;
        }
        .footer a {
            color: #C8EC66; /* Liens en vert Vroom */
            text-decoration: none;
            font-weight: 500;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- En-tête -->
        <div class="header">
            <img src="${baseUrl}/images/logo.png" alt="Vroom Logo">
        </div>
        
        <!-- Alerte de statut -->
        <div class="header-alert">
            Nouveau rendez-vous - Statut: À venir
        </div>
        
        <!-- Contenu principal -->
        <div class="content">
            <h2>Nouveau rendez-vous client enregistré</h2>
            
            <!-- Carte d'informations client -->
            <div class="client-card">
                <div class="client-avatar">${name.charAt(0).toUpperCase()}</div>
                <div class="client-info">
                    <h3 class="client-name">${name}</h3>
                    <p class="client-contact"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p class="client-contact"><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
                </div>
            </div>
            
            <!-- Détails du rendez-vous -->
            <div class="info-section">
                <h3>Détails du rendez-vous</h3>
                <div class="appointment-box">
                    <div class="appointment-detail">
                        <div class="detail-icon">📅</div>
                        <div class="detail-content">
                            <p class="detail-label">Date</p>
                            <p class="detail-value">${formattedDate}</p>
                        </div>
                    </div>
                    <div class="appointment-detail">
                        <div class="detail-icon">🕒</div>
                        <div class="detail-content">
                            <p class="detail-label">Heure</p>
                            <p class="detail-value">${formattedTime}</p>
                        </div>
                    </div>
                    <div class="appointment-detail">
                        <div class="detail-icon">⏱️</div>
                        <div class="detail-content">
                            <p class="detail-label">Durée</p>
                            <p class="detail-value">${durationMinutes} minutes</p>
                        </div>
                    </div>
                    <div class="appointment-detail">
                        <div class="detail-icon">👤</div>
                        <div class="detail-content">
                            <p class="detail-label">Conseiller assigné</p>
                            <p class="detail-value">${vroomerFullName}</p>
                        </div>
                    </div>
                </div>
                
                ${message ? `
                <h3>Message du client</h3>
                <div class="client-message">
                    <p>${message}</p>
                </div>
                ` : ''}
            </div>
            
            <!-- Bouton d'action -->
            <div class="cta-button">
                <a href="${baseUrl}/admin/rendez-vous">Gérer les rendez-vous</a>
            </div>
        </div>
        
        <!-- Pied de page -->
        <div class="footer">
            <p>Ce message est envoyé automatiquement suite à une prise de rendez-vous sur le site Vroom.</p>
            <p>© ${new Date().getFullYear()} <strong style="color: #C8EC66;">Vroom</strong> - Tous droits réservés</p>
        </div>
    </div>
</body>
</html>
`;

        // --- 5. Send Email using Resend ---
        if (!resend) {
            console.error("Resend client not initialized (likely missing API key).");
            return NextResponse.json({ error: 'Configuration du serveur: client email non initialisé' }, { status: 500 });
        }

        // Logging for dev mode
        if (isDevelopment) {
             console.log('--- DEVELOPMENT MODE (Enhanced UI) ---');
             console.log('Attempting send with config:');
             console.log('  Sender:', senderEmail);
             console.log('  Recipient:', recipientEmail, `(Actual client: ${email})`);
             console.log('  Subject:', emailSubject);
             console.log('  Base URL:', baseUrl);
             console.log('  Logo Path:', `${baseUrl}/images/logo.png`);
        }

        const { data: sendData, error: sendError } = await resend.emails.send({
            from: senderEmail,
            to: [recipientEmail], // Use the possibly overridden recipient email
            subject: emailSubject,
            text: textContent, // Keep text version for clients that don't render HTML
            html: htmlContent,  // Use the new enhanced HTML
            attachments: [
                {
                    filename: `rendez-vous-vroom-${date}.ics`, // More specific filename
                    content: Buffer.from(iCalContent).toString('base64'),
                    contentType: 'text/calendar; charset=utf-8; method=REQUEST', // Specify content type
                },
            ],
            headers: {
                'X-Entity-Ref-ID': `appointment-${Date.now()}`,
            },
            tags: [
                { name: 'appointment', value: 'confirmation' },
                { name: 'vroomer', value: vroomer },
            ]
        });

        // --- 6. Handle Resend Response ---
        if (sendError) {
            console.error('Erreur lors de l\'envoi de l\'email via Resend:', sendError);
            console.error(`Failed to send email to ${recipientEmail}. Resend Error: ${sendError.message}`);
            return NextResponse.json(
                { error: 'Erreur technique lors de l\'envoi de l\'email de confirmation.', details: sendError.message },
                { status: 500 }
            );
        }

        // Success
        console.log(`Email de confirmation (enhanced UI) envoyé avec succès à ${recipientEmail}. Resend ID: ${sendData?.id}`);
        const responseMessage = isDevelopment && email !== recipientEmail
            ? `Email de confirmation envoyé avec succès à ${recipientEmail} (adresse de test) au lieu de ${email} !`
            : 'Email de confirmation envoyé avec succès !';

        return NextResponse.json({
            message: responseMessage,
            resendId: sendData?.id,
            testMode: isDevelopment
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Erreur inattendue dans la fonction POST:', error);
        let errorMessage = 'Une erreur interne est survenue.';
        if (error instanceof Error) {
            errorMessage = `Erreur interne du serveur: ${error.message}`;
            if (error instanceof SyntaxError) {
                return NextResponse.json({ error: 'Format JSON invalide dans la requête' }, { status: 400 });
            }
        }
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
};