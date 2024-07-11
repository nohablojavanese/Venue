"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  customClass?: string;
}

export default function SignOutButton({ customClass }: SignOutButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    } else {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className={`${customClass} bg-gray-500 hover:bg-gray-600 focus:ring-gray-500`}
    >
      Keluar
    </button>
  );
}