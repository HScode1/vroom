'use client';

import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { motion } from 'framer-motion';
import { CircleOff, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Import Supabase client
import { UserResource } from '@clerk/types'; // Import UserResource type

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
    redirectNonAuth = true,
    adminPath = '/addCar',
    defaultPath = '/',
    loadingTime = 1000
}) => {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [redirectPath, setRedirectPath] = useState('');
    const [elapsedLoadingTime, setElapsedLoadingTime] = useState(false);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

    // --- Function to Sync User with Supabase ---
    async function syncUserWithSupabase(clerkUser: UserResource) {
      const { id: clerkId, emailAddresses, firstName, lastName } = clerkUser;
      const email = emailAddresses[0].emailAddress;
      const name = `${firstName || ''} ${lastName || ''}`.trim() || null;
    
      // Check if user exists by clerk_id
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', clerkId)
        .maybeSingle();
    
      if (fetchError) {
        console.error('Error checking user:', fetchError);
        return;
      }
    
      if (existingUser) {
        // User exists, update if necessary
        const { error: updateError } = await supabase
          .from('users')
          .update({ email, name, updated_at: new Date().toISOString() })
          .eq('id', existingUser.id);
    
        if (updateError) {
          console.error('Error updating user:', updateError);
        } else {
          console.log(`User ${clerkId} updated in Supabase`);
        }
      } else {
        // User doesn’t exist, insert new user
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            clerk_id: clerkId,
            email,
            name,
            role: 'buyer', // Adjust based on your app’s logic
            created_at: new Date().toISOString(),
          });
    
        if (insertError) {
          console.error('Error inserting user:', insertError);
        } else {
          console.log(`User ${clerkId} added to Supabase`);
        }
      }
    }
    // Attendre un temps minimum avant de considérer le chargement comme terminé
    useEffect(() => {
        const timer = setTimeout(() => {
            setElapsedLoadingTime(true);
        }, loadingTime);

        return () => clearTimeout(timer);
    }, [loadingTime]);

    // Gérer la synchronisation et déterminer la redirection
    useEffect(() => {
        // Only proceed when Clerk is loaded and minimum time has passed
        if (isLoaded && elapsedLoadingTime) {
            if (user) {
                // --- Sync User ---
                // Trigger sync but don't necessarily wait for it to complete
                // unless syncStatus needs to influence redirection.
                if (syncStatus === 'idle') {
                     syncUserWithSupabase(user);
                }

                // --- Determine Redirect Path ---
                let path = defaultPath;
                const role = user.publicMetadata.role as string | undefined;
                if (role === 'admin') {
                    path = adminPath;
                }
                setRedirectPath(path);
                setIsRedirecting(true); // Prepare for redirection

            } else if (redirectNonAuth) {
                // No user, but redirection is enabled
                setRedirectPath(defaultPath);
                setIsRedirecting(true); // Prepare for redirection
            }
             // If no user and redirectNonAuth is false, do nothing (stays on loading)
        }
    }, [user, isLoaded, elapsedLoadingTime, adminPath, defaultPath, redirectNonAuth, syncUserWithSupabase, syncStatus]); // Added sync dependencies


    // Effectuer la redirection une fois que le chemin est déterminé
    useEffect(() => {
        if (isRedirecting && redirectPath) {
             // Small delay to allow sync attempt to progress, but don't block indefinitely
             const redirectTimer = setTimeout(() => {
                console.log("Redirecting to:", redirectPath);
                router.replace(redirectPath);
             }, 200); // Short delay, adjust if needed

             return () => clearTimeout(redirectTimer);
        }
    }, [isRedirecting, redirectPath, router]);

    // Message de chargement personnalisé en fonction de l'état
    const getLoadingMessage = () => {
        if (timeout) return "Erreur de chargement";
        if (!isLoaded) return message;
        if (!elapsedLoadingTime) return message;
        // Optional: Show sync status
        // if (syncStatus === 'syncing') return "Synchronisation de votre profil...";
        // if (syncStatus === 'error') return "Erreur de synchronisation, redirection..."; // Or handle differently
        if (isRedirecting) return `Redirection vers ${redirectPath}...`;
        if (!user && !redirectNonAuth) return "Veuillez vous connecter pour continuer.";
        return "Vérification de vos informations...";
    };

    // --- Render ---
    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-md p-6 flex flex-col items-center">
                {/* Logo animation (unchanged) */}
                <div className="mb-8 relative">
                    {!timeout ? (
                        <div className="relative">
                            <motion.div
                                className="w-24 h-24 rounded-full border-4 border-gray-200"
                                style={{ borderTopColor: '#C8EC66', borderRightColor: '#C8EC66' }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-12 h-12 relative">
                                    <Image
                                        src="/images/logo.png"
                                        alt="VROOMPARIS LOGO"
                                        fill sizes="48px"
                                        className="object-contain [filter:brightness(0)_sepia(100%)_hue-rotate(80deg)_saturate(700%)_brightness(1.1)]"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-red-200 flex items-center justify-center bg-red-50">
                                <CircleOff className="w-10 h-10 text-red-400" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Loading Message (unchanged) */}
                 <motion.div
                    className="text-center mb-6 min-h-[60px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className={`text-lg font-medium mb-2 ${timeout ? 'text-red-700' : 'text-gray-800'}`}>{getLoadingMessage()}</h3>
                    {!timeout ? (
                        <div className="flex justify-center items-center h-5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 mx-1 bg-[#C8EC66] rounded-full"
                                    animate={{ y: [0, -5, 0], opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 h-5 flex items-center justify-center">
                            Quelque chose n'a pas fonctionné correctement.
                        </p>
                    )}
                </motion.div>

                {/* Error Retry Button (unchanged) */}
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

                {/* Debug Info (updated to include syncStatus) */}
                {process.env.NODE_ENV === 'development' && isLoaded && (
                    <div className="mt-4 text-xs text-gray-400 p-2 bg-gray-50 rounded-lg max-w-full overflow-hidden text-left break-words">
                        <p>User Loaded: {isLoaded.toString()}</p>
                        <p>Elapsed Min Time: {elapsedLoadingTime.toString()}</p>
                        {user ? (
                            <>
                                <p>Utilisateur: {user.fullName || user.username || user.primaryEmailAddress?.emailAddress || 'N/A'}</p>
                                <p>Rôle: {(user.publicMetadata.role as string) || 'Non défini'}</p>
                                <p>Sync Status: <span className={
                                    syncStatus === 'syncing' ? 'text-blue-500' :
                                    syncStatus === 'synced' ? 'text-green-500' :
                                    syncStatus === 'error' ? 'text-red-500' : ''
                                }>{syncStatus}</span></p>
                            </>
                        ) : <p>Utilisateur: Non connecté</p>}
                        <p>Redirect Non-Auth: {redirectNonAuth.toString()}</p>
                        <p>Is Redirecting: {isRedirecting.toString()}</p>
                        <p>Redirection Path: {redirectPath || 'Aucune'}</p>
                    </div>
                )}

                 {/* Subtle hints (unchanged) */}
                 {!timeout && !isRedirecting && (
                    <motion.div
                        className="text-xs text-gray-400 mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 3 }}
                    >
                        <p>Nous préparons votre expérience...</p>
                        <p className="mt-1">Cela ne devrait prendre que quelques secondes.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default function AfterSignPage() {
    return (
        <LoadingPage
            message="Finalisation de votre connexion..."
            redirectNonAuth={true} // Redirects non-logged-in users away
            adminPath="/addCar"     // Admin destination
            defaultPath="/"       // Default destination for regular users
            loadingTime={1500}    // Minimum time on this screen
        />
    );
}