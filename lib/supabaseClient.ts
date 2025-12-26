
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : '';
const supabaseAnonKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : '';

// Provide fallback values to prevent initialization errors during the Vercel build phase
// Replace with real values in Vercel Environment Variables dashboard
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
