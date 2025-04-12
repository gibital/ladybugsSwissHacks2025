// useSupabaseSession.ts
import { useState, useEffect } from 'react';
import { supabase } from '../clients/supabaseClient'
import { Session } from '@supabase/supabase-js';

export function useSupabaseSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Define an async function to get the current session.
    async function getInitialSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }

    getInitialSession();

    // Subscribe to auth state changes.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    // Cleanup subscription on unmount.
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
