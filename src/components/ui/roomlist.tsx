'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface Room {
  id: string;
  name: string;
  is_private: boolean;
}

interface RoomListProps {
  currentUser: User;
}

export default function RoomList({ currentUser }: RoomListProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .or(`is_private.eq.false,created_by.eq.${currentUser.id}`);

      if (error) {
        console.error('Error fetching rooms:', error);
      } else {
        setRooms(data || []);
      }
    };

    fetchRooms();

    const channel = supabase
      .channel('public:rooms')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
        fetchRooms();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser.id]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const { error } = await supabase
      .from('rooms')
      .insert({ name: newRoomName, created_by: currentUser.id, is_private: isPrivate });

    if (error) {
      console.error('Error creating room:', error);
    } else {
      setNewRoomName('');
      setIsPrivate(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Chat Rooms</h2>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={`/chat/${room.id}`} className="block p-2 hover:bg-gray-100 rounded">
              {room.name} {room.is_private && '🔒'}
            </Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateRoom} className="space-y-2">
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New room name..."
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPrivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="isPrivate">Private Room</label>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create Room
        </button>
      </form>
    </div>
  );
}