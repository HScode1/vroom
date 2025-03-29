// src/hooks/useSupabaseClient.ts (Exemple de hook)
import { useSession } from "@clerk/nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Database } from "@/types/database.types"; // Adjust path

export function useSupabaseClient(): SupabaseClient<Database> | null {
    const { session } = useSession();
    const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<Database> | null>(null);

    useEffect(() => {
        if (session) {
            const createClientInstance = async () => {
                const supabaseAccessToken = await session.getToken({
                    template: "supabase", // Use the template name from Clerk
                });

                if (!supabaseAccessToken) {
                     console.warn("Clerk session exists but Supabase token could not be generated.");
                     setSupabaseClient(null); // Or handle differently
                     return;
                }

                const client = createClient<Database>(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Still need Anon key
                    {
                        global: {
                            headers: {
                                Authorization: `Bearer ${supabaseAccessToken}`,
                            },
                        },
                    }
                );
                setSupabaseClient(client);
            };
            createClientInstance();
        } else {
            setSupabaseClient(null); // No session, no authenticated client
        }
    }, [session]);

    return supabaseClient;
}