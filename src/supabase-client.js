import { createClient } from '@supabase/supabase-js';

// Put your own Supabase URL and Key here
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-api-key';

export const supabase = createClient(supabaseUrl, supabaseKey);