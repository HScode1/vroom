// src/app/api/appointments/add-to-calendar/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Fonction pour obtenir le nom complet du Vroomer (inchangée)
const getFullVroomerName = (vroomerCode: string | undefined): string => {
  switch (vroomerCode) {
    case 'zinedine': return 'Zinedine Aberkane';
    case 'lopez': return 'Michel Lopez';
    default: return 'Non spécifié';
  }
};

export async function POST(request: Request) {
  console.log("API add-to-calendar appelée");
  let data; // Déclarer data en dehors du try pour la portée

  try {
    // === Bloc pour parser le JSON de manière sécurisée ===
    try {
        data = await request.json();
    } catch (parseError: unknown) {
        const error = parseError as Error; // Cast à Error pour accéder à .message de façon type-safe
        console.error("Erreur de parsing JSON:", error.message);
        // Essayer de lire le corps brut pour le logging (best effort)
        let rawBody = "[Impossible de lire le corps brut]";
        try {
            // Cloner la requête car .json() a consommé le corps original
            rawBody = await request.clone().text();
        } catch (e) {
             console.error("Impossible de cloner ou lire le corps brut:", e);
        }
        console.error("Corps de la requête reçu (brut lors de l'erreur JSON):", rawBody);
        // Retourner une erreur 400 claire au client
        return NextResponse.json({ error: 'Corps de requête invalide - JSON attendu.' }, { status: 400 });
    }
    // ====================================================

    // Si le parsing a réussi, continuer le traitement
    const { date, time, name, email, phone, message, vroomer, duration } = data;
    console.log("Données reçues pour calendrier:", data);

    // Validation des champs obligatoires
    if (!date || !time || !name || !email) {
      console.error("Champs obligatoires manquants pour calendrier:", { date, time, name, email });
      return NextResponse.json({ error: 'Champs obligatoires manquants (date, time, name, email)' }, { status: 400 });
    }

    // Vérification des variables d'environnement
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!clientEmail || !privateKey || !calendarId) {
      console.error("Variables d'environnement Google manquantes !");
      return NextResponse.json({ error: 'Configuration serveur incomplète' }, { status: 500 });
    }

    // Corrige le format de la clé privée
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    // Configuration de l'authentification JWT
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'], // Scope nécessaire
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Calculer l'heure de début et de fin
    const startDateTime = new Date(`${date}T${time}:00`);
    // S'assurer que duration est un nombre, défaut à 60 minutes
    const eventDurationMinutes = parseInt(duration || '60', 10);
     // Vérifier si eventDurationMinutes est un nombre valide, sinon utiliser 60
    if (isNaN(eventDurationMinutes) || eventDurationMinutes <= 0) {
        console.warn(`Durée invalide reçue ('${duration}'), utilisation de 60 minutes par défaut.`);
        // eventDurationMinutes = 60; // Déjà géré par le || '60' et le parseInt, mais une vérification explicite est plus sûre
    }
    const endDateTime = new Date(startDateTime.getTime() + eventDurationMinutes * 60000); // Ajoute la durée en millisecondes

    // Vérifier la validité des dates (si la conversion a échoué)
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        console.error("Date ou heure invalide fournie:", { date, time });
        return NextResponse.json({ error: 'Format de date ou heure invalide' }, { status: 400 });
    }

    console.log("Heure de début (UTC):", startDateTime.toISOString());
    console.log("Heure de fin (UTC):", endDateTime.toISOString());
    console.log("Fuseau horaire cible: Europe/Paris");


    // Créer l'objet événement
    const event = {
      summary: `RDV Vroom - ${name}`, // Titre de l'événement
      description: `
        Client: ${name}
        Email: ${email}
        Téléphone: ${phone || 'Non fourni'}
        Vroomer: ${getFullVroomerName(vroomer)}
        Durée: ${eventDurationMinutes} minutes
        Date et Heure (Paris): ${startDateTime.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
        --------------------
        Message:
        ${message || 'Aucun'}
      `.trim(), // .trim() pour enlever les espaces/lignes vides au début/fin
      start: {
        dateTime: startDateTime.toISOString(), // Format ISO 8601 (UTC)
        timeZone: 'Europe/Paris', // IMPORTANT : Spécifie le fuseau horaire D'AFFICHAGE dans Google Calendar
      },
      end: {
        dateTime: endDateTime.toISOString(), // Format ISO 8601 (UTC)
        timeZone: 'Europe/Paris', // IMPORTANT : Spécifie le fuseau horaire D'AFFICHAGE dans Google Calendar
      },
      // Optionnel: Ajouter des participants (le client peut recevoir une invitation Google Calendar)
      // attendees: [
      //   { email: email, displayName: name },
      //   // Ajouter l'email du Vroomer s'il est connu et doit être invité
      // ],
      reminders: { // Optionnel: Rappels
        useDefault: false, // Ne pas utiliser les rappels par défaut du calendrier
        overrides: [
          { method: 'email', 'minutes': 60 }, // Rappel 1h avant par email (si configuré pour le calendrier)
          { method: 'popup', 'minutes': 30 },  // Rappel 30min avant via notification Calendar
        ],
      },
    };

    console.log("Tentative d'insertion d'événement dans le calendrier:", calendarId);
    console.log("Données de l'événement pour Google:", JSON.stringify(event, null, 2)); // Log l'objet event formaté

    // Insérer l'événement dans le calendrier spécifié
    const calendarResponse = await calendar.events.insert({
      calendarId: calendarId, // Utilise l'ID du calendrier cible
      requestBody: event,
      // sendNotifications: true, // Décommenter pour envoyer des invitations aux 'attendees'
    });

    console.log('Événement ajouté au calendrier avec succès:', calendarResponse.data.id);

    // Retourner une réponse de succès
    return NextResponse.json({
      message: 'Événement ajouté au calendrier avec succès',
      eventId: calendarResponse.data.id
    }, { status: 200 });

  } catch (error: unknown) {
    // === Gestion globale des erreurs (Google API, config, etc.) ===
    console.error('Erreur globale lors de l\'ajout au calendrier Google:', error);

    // Log plus détaillé de l'erreur Google API si disponible
    // Utiliser type guard pour vérifier la structure avant d'accéder aux propriétés
    interface GoogleApiError {
      response: {
        data: unknown;
        status: number;
        headers?: unknown;
      };
    }

    interface RequestError {
      request: unknown;
    }

    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as GoogleApiError;
      console.error('Google API Error Data:', JSON.stringify(apiError.response.data, null, 2));
      console.error('Google API Error Status:', apiError.response.status);
      // console.error('Google API Error Headers:', apiError.response.headers); // Peut être verbeux
    } else if (error && typeof error === 'object' && 'request' in error) {
      // Erreur si la requête a été faite mais aucune réponse reçue
      console.error('Google API No response received:', (error as RequestError).request);
    } else {
      // Erreur lors de la configuration de la requête ou autre erreur JS
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error setting up Google API request or other error:', errorMessage);
    }

    // Retourner une erreur 500 générique mais informative
    return NextResponse.json({
        error: 'Erreur serveur lors de l\'ajout au calendrier',
        // Fournir des détails peut être utile en dev, mais potentiellement sensible en prod
        details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
    // ===============================================================
  }
};