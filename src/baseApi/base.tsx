import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_ANON_KEY.slice(0, import.meta.env.VITE_SUPABASE_ANON_KEY.indexOf('.'))+'.supabase.co'
const supabase = createClient(url, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default supabase
