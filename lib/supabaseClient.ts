
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If keys aren't provided, this will still initialize but requests will fail gracefully
// Use this client to fetch your products and handle orders.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * DATABASE MANAGEMENT TIP:
 * When you upload images to Supabase Storage, ensure the bucket is 'public'.
 * Then, store the URL in your 'products' table. 
 * The app will automatically fetch the real images instead of these demos.
 */
