import { createClient } from '@/utils/supabase/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(String(req.query.code));

  if (error) {
    console.error('Error exchanging code for session:', error);
    return res.redirect('/login?error=Unable to sign in');
  }

  return res.redirect('/private');
}