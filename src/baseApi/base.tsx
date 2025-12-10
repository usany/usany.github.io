import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const supabase = createClient(url, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default supabase
