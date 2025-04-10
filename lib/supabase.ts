import { createClient } from "@supabase/supabase-js"

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Criar um cliente Supabase para o lado do cliente com tratamento de erro
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Criar um cliente Supabase para o lado do servidor com tratamento de erro
export const createServerSupabaseClient = () => {
  const serverSupabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serverSupabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return createClient(serverSupabaseUrl || "", serverSupabaseAnonKey || "", {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
    },
  })
}
