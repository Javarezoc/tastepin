import { createClient } from '@supabase/supabase-js';

// Criando um cliente Supabase para o lado do servidor
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    }
  });
};

// Singleton para o cliente Supabase no lado do cliente
let clientSupabaseInstance: ReturnType<typeof createClient> | null = null;

export const createClientSupabaseClient = () => {
  if (clientSupabaseInstance) return clientSupabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  clientSupabaseInstance = createClient(supabaseUrl, supabaseKey);
  return clientSupabaseInstance;
};
