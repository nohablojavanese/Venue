'use server'

import { createClient } from "@/utils/supabase/server";

export async function updateUserProfile(userData: { name: string; phone: string; location?: string }) {
  const supabase = createClient();

  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data.user) {
    throw new Error('User not found');
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      name: userData.name,
      phone: userData.phone,
      location: userData.location,
    },
  });

  if (error) {
    throw error;
  }

  return { success: true };
}