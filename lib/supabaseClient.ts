
import { createClient } from '@supabase/supabase-js';

// Safe environment variable access for browser/preview environments
const getEnv = (key: string): string => {
  try {
    // Check if process exists and has the key
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
    // Fallback for Vite or other environments if needed
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key] as string;
    }
  } catch (e) {
    console.warn(`Could not access environment variable: ${key}`);
  }
  return '';
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// Initialize client. If keys are missing, it will still be an object but calls will fail.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
