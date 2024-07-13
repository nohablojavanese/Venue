import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ChatRoom from '@/components/ui/chatroom';

export default async function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient();

  if (!params.roomId) {
    console.error('roomId is undefined');
    notFound();
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError);
      return null;
    }

    if (!user) {
      console.log('No user found');
      return null;
    }

    console.log('User found:', user.id);

    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', params.roomId)
      .single();

    if (roomError) {
      console.error('Error fetching room:', roomError);
      notFound();
    }

    if (!room) {
      console.log('No room found for id:', params.roomId);
      notFound();
    }

    if (room.is_private) {
      console.log('Room is private, checking membership');
      const { data: membership, error: membershipError } = await supabase
        .from('room_members')
        .select('*')
        .eq('room_id', params.roomId)
        .eq('user_id', user.id)
        .single();

      if (membershipError) {
        console.error('Error checking room membership:', membershipError);
      }

      if (!membership && room.created_by !== user.id) {
        console.log('User is not a member of this private room');
        notFound();
      }
    }

    return (
      <div className="h-full flex flex-col">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">{room.name}</h1>
        </div>
        <div className="flex-grow">
          <ChatRoom roomId={params.roomId} currentUser={user} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return <div>An unexpected error occurred</div>;
  }
}