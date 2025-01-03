'use server'
import { supabase } from '@/utils/supabase'
import { createSupabaseServerClient } from '@/utils/supabase/server'


export async function getUser() {
    const supabase = await createSupabaseServerClient()
    return await supabase.auth.getUser()
  }

export async function getUserSession() {
    const { data, error } = await getUser()
  
    if (error) {
      return { user: null, error }
    }
  
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()
  
    return { user: user, error: userError }
  }