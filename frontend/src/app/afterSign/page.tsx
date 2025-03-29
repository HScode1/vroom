'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleOff, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Define the props interface for better type safety
interface LoadingPageProps {
  message?: string;
  timeout?: boolean;
  onRetry?: () => void;
  redirectNonAuth?: boolean;
  adminPath?: string;
  defaultPath?: string;
  loadingTime?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  message = "Chargement en cours...",
  timeout = false,
  onRetry = () => window.location.reload(),
  redirectNonAuth = true, // Option pour contrôler si les utilisateurs non authentifiés sont redirigés
  adminPath = '/addCar',  // Chemin pour les administrateurs
  defaultPath = '/',      // Chemin par défaut pour les utilisateurs normaux
  loadingTime = 1000      // Temps minimum de chargement pour éviter les flashs
}) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const [elapsedLoadingTime, setElapsedLoadingTime] = useState(false);

  // Attendre un temps minimum avant de considérer le chargement comme terminé
  useEffect(() => {
    const timer = setTimeout(() => {
      setElapsedLoadingTime(true);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime]);

  // Déterminer où rediriger l'utilisateur en fonction de son rôle
  useEffect(() => {
    if (isLoaded && elapsedLoadingTime) {
      let path = defaultPath;

      if (user) {
        // L'utilisateur est connecté
        const role = user.publicMetadata.role as string | undefined;

        if (role === 'admin') {
          path = adminPath;
        }

        setRedirectPath(path);
        setIsRedirecting(true);
      } else if (redirectNonAuth) {
        // L'utilisateur n'est pas connecté et la redirection est activée
        setRedirectPath(defaultPath);
        setIsRedirecting(true);
      }
      // If user is not loaded and redirectNonAuth is false, do nothing (stay on loading page)
    }
  }, [user, isLoaded, elapsedLoadingTime, adminPath, defaultPath, redirectNonAuth]);

  // Effectuer la redirection une fois que le chemin est déterminé
  useEffect(() => {
    if (isRedirecting && redirectPath) {
      // Use replace instead of push to avoid adding the loading page to history
      router.replace(redirectPath);
    }
  }, [isRedirecting, redirectPath, router]);

  // Message de chargement personnalisé en fonction de l'état
  const getLoadingMessage = () => {
    if (timeout) return "Erreur de chargement";
    if (!isLoaded) return message;
    if (!elapsedLoadingTime) return message; // Still waiting for minimum loading time
    if (isRedirecting) return `Redirection vers ${redirectPath}...`;
    if (!user && !redirectNonAuth) return "Veuillez vous connecter pour continuer."; // Specific message if not logged in and no redirect
    return "Vérification de vos informations...";
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md p-6 flex flex-col items-center">
        {/* Logo animation */}
        <div className="mb-8 relative">
          {!timeout ? (
            <div className="relative">
              {/* Outer spinning circle */}
              <motion.div
                className="w-24 h-24 rounded-full border-4 border-gray-200"
                style={{ borderTopColor: '#C8EC66', borderRightColor: '#C8EC66' }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Logo pulsing in center */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/logo.png"
                    alt="VROOMPARIS LOGO"
                    fill // Use fill layout
                    sizes="48px" // Provide sizes prop when using fill
                    className="object-contain [filter:brightness(0)_sepia(100%)_hue-rotate(80deg)_saturate(700%)_brightness(1.1)]"
                    priority // Preload the logo if it's critical
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            // Timeout/Error state visual
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-red-200 flex items-center justify-center bg-red-50">
                <CircleOff className="w-10 h-10 text-red-400" />
              </div>
            </div>
          )}
        </div>

        {/* Animated text dots */}
        <motion.div
          className="text-center mb-6 min-h-[60px]" // Add min-height to prevent layout shifts
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className={`text-lg font-medium mb-2 ${timeout ? 'text-red-700' : 'text-gray-800'}`}>{getLoadingMessage()}</h3>

          {!timeout ? (
            // Loading dots animation
            <div className="flex justify-center items-center h-5"> {/* Fixed height for dots container */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 mx-1 bg-[#C8EC66] rounded-full"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.2, 1, 0.2]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          ) : (
            // Error message text
            // 152:30 Error: '`' can be escaped with `'`, `‘`, `'`, `’`. react/no-unescaped-entities
            // FIX: Replaced ' with '
            <p className="text-sm text-gray-500 h-5 flex items-center justify-center"> {/* Fixed height */}
              Quelque chose n&apos; a pas fonctionné correctement.
            </p>
          )}
        </motion.div>

        {/* Error retry button */}
        {timeout && (
          <motion.button
            onClick={onRetry}
            className="flex items-center gap-2 mt-4 px-6 py-2.5 bg-[#C8EC66] text-black font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Réessayer
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}

        {/* User info (debug) */}
        {process.env.NODE_ENV === 'development' && isLoaded && ( // Only show debug info when Clerk is loaded
          <div className="mt-4 text-xs text-gray-400 p-2 bg-gray-50 rounded-lg max-w-full overflow-hidden text-left break-words">
            <p>User Loaded: {isLoaded.toString()}</p>
            <p>Elapsed Min Time: {elapsedLoadingTime.toString()}</p>
            {user ? (
              <>
                <p>Utilisateur: {user.fullName || user.username || user.primaryEmailAddress?.emailAddress || 'N/A'}</p>
                <p>Rôle: {(user.publicMetadata.role as string) || 'Non défini'}</p>
              </>
            ) : <p>Utilisateur: Non connecté</p>}
             <p>Redirect Non-Auth: {redirectNonAuth.toString()}</p>
            <p>Is Redirecting: {isRedirecting.toString()}</p>
            <p>Redirection Path: {redirectPath || 'Aucune'}</p>
          </div>
        )}

        {/* Subtle hints */}
        {!timeout && !isRedirecting && (
          <motion.div
            className="text-xs text-gray-400 mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 3 }} // Show hint after 3 seconds
          >
            <p>Nous préparons votre expérience...</p>
            <p className="mt-1">Cela ne devrait prendre que quelques secondes.</p> {/* Added period */}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function AfterSignPage() {
  // Cette page s'affiche après la connexion et redirige automatiquement l'utilisateur
  // vers la page appropriée en fonction de son rôle
  return (
    <LoadingPage 
      message="Finalisation de votre connexion..."
      redirectNonAuth={true}
      adminPath="/addCar"
      defaultPath="/"
      loadingTime={1500}
    />
  );
}