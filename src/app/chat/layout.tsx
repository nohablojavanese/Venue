import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RoomList from '@/components/ui/roomlist';

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 border-r">
        <RoomList currentUser={user} />
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
