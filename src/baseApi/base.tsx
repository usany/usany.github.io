import { createClient } from '@supabase/supabase-js'
const supabase = createClient("https://"+import.meta.env.VITE_SUPABASE_URL, "https://"+import.meta.env.VITE_SUPABASE_ANON_KEY);
export default supabase
