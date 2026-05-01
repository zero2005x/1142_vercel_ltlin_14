import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabaseError = !supabaseUrl
    ? 'NEXT_PUBLIC_SUPABASE_URL is not set.'
    : !supabasePublishableKey
        ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set.'
        : null;

export const supabase = supabaseError
    ? null
    : createClient(supabaseUrl!, supabasePublishableKey!);

export { supabaseError };