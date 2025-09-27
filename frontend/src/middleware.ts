import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', // Page d'accueil avec la vidéo
  '/vehicules', // Page de listing des véhicules
  '/cardetails/(.*)', // Pages de détail des véhicules (correspond à n'importe quel ID)
  '/api/appointments/(.*)' // API pour la prise de rendez-vous (accessible depuis la page d'accueil)
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Exclure les fichiers statiques et les internes de Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Toujours exécuter pour les routes API
    '/(api|trpc)(.*)',
  ],
};