'use client'
import React, { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

interface Room {
  id: string;
  name: string;
}

interface RoomListProps {
  currentUser: User;
}

export default function RoomList({ currentUser }: RoomListProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rooms:', error);
      } else {
        setRooms(data || []);
      }
    };

    fetchRooms();

    const channel = supabase
      .channel('room_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, fetchRooms)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Chat Rooms</h2>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={`/chat/${room.id}`} className="block p-2 hover:bg-gray-200 rounded">
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}