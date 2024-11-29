import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rzltwgtrlomuybkqcpru.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bHR3Z3RybG9tdXlia3FjcHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MTQ0ODQsImV4cCI6MjAzOTk5MDQ4NH0.qo35dQrvDGnLTmjjE2zN55HhgRdNPhur8QIhphKq1lA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)