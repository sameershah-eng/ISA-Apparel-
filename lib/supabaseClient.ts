import { createClient } from '@supabase/supabase-js';

// These are your actual credentials from the Supabase Dashboard
const supabaseUrl = 'https://cyfuylwrbyqyfynfzgrp.supabase.co';
// Use the "Publishable key" (safe for the browser)
const supabaseAnonKey = 'sb_publishable_6nwafGPrtqm9XtaQ8LgEow_1io4bRKq';

/**
 * Initializing the client with your project-specific details.
 * The Publishable key is used to respect Row Level Security (RLS).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('ISA: Supabase client connected to project cyfuylwrbyqyfynfzgrp');