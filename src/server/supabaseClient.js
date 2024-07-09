import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseOptions = {
  auth: {
    persistSession: true,
  },
};

if (typeof window !== "undefined") {
  supabaseOptions.auth.storage = localStorage;
}

const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions);

export default supabase;
