"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMessage(userId: string, content: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('messages')
    .insert({ user_id: userId, content })
    .select();

  if (error) {
    return { error: error.message };
  }

  return { data };
}