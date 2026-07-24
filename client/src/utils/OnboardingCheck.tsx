import { supabase } from '@/lib/supabaseClient'

async function hydrateOnboardingStatus(userId: string): Promise<boolean | null> {
  const { data } = await supabase.from('providers').select('isonboarding').eq('id', userId).single()
  if (data) {
    return data.isonboarding
  }
  return null
}

export default hydrateOnboardingStatus
