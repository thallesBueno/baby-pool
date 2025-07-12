  import { createClient } from '@supabase/supabase-js'

const NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZ21vY3BzY3h5YXhlZ211ZXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjAzMTIsImV4cCI6MjA2NzgzNjMxMn0.0wHXibR889avjb1tlWfqhQfpBFBHv9tWPts6wq2jV-A"

export const supabase = createClient('https://shgmocpscxyaxegmuesh.supabase.co', NEXT_PUBLIC_SUPABASE_ANON_KEY);