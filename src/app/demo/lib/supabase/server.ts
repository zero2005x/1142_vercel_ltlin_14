import 'server-only';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const supabaseAdminError = !supabaseUrl
    ? 'NEXT_PUBLIC_SUPABASE_URL is not set.'
    : !supabaseSecretKey
        ? 'SUPABASE_SECRET_KEY is not set.'
        : null;

export const supabaseAdmin = supabaseAdminError
    ? null
    : createClient(supabaseUrl!, supabaseSecretKey!, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

export { supabaseAdminError };