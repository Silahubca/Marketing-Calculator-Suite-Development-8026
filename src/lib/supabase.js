import { createClient } from '@supabase/supabase-js'

// Project credentials
const SUPABASE_URL = 'https://gnecpkyvggjkmllcqrrw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZWNwa3l2Z2dqa21sbGNxcnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwODU0MDQsImV4cCI6MjA2NjY2MTQwNH0.oQsit8vwX9C8jAGFx_RhwzWGcCfDFD6Lo6LayN1T3tk'

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})