import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const supabase = createClient(import.meta.env.VITE_SUPABASE_BASIC_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default supabase
