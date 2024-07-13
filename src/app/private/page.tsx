import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import UserProfile from "@/components/ui/userprofile";

export default async function AccountPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <UserProfile user={data.user} />
      </div>
    </div>
  );
}