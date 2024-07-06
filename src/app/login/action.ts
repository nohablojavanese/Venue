"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    const errorMessages = parsedData.error.errors.map((err) => err.message);
    return { success: false, errors: errorMessages };
  }

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    if (error.message === "Invalid login credentials") {
      return { success: false, errors: ["Incorrect Password"] };
    } else {
      return { success: false, errors: [error.message] };
    }
  }

  // Perform revalidation and redirection
  if (typeof revalidatePath === "function") {
    revalidatePath("/", "layout");
  }
  if (typeof redirect === "function") {
    redirect("/"); 
  }

  return { success: true }; 
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const parsedData = signupSchema.safeParse(data);
  if (!parsedData.success) {
    const errorMessages = parsedData.error.errors
      .map((err) => err.message)
      .join(", ");
    redirect(`/error?message=${encodeURIComponent(errorMessages)}`);
    return;
  }

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    redirect("/error");
    return;
  }

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
