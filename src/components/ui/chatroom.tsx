'use client'
import React, { useEffect, useState, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { format } from 'date-fns';
import Image from 'next/image';

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    email: string;
    user_metadata: {
      full_name?: string;
      avatar_url?: string;
    };
  };
}

interface ChatRoomProps {
  roomId: string;
  currentUser: User;
}

export default function ChatRoom({ roomId, currentUser }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          user:user_id (
            id,
            email,
            user_metadata
          )
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({ user_id: currentUser.id, content: newMessage, room_id: roomId });

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.user_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-xs sm:max-w-md ${message.user_id === currentUser.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* <Image
                src={message.user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.user.user_metadata.full_name || message.user.email)}`}
                alt={message.user.user_metadata.full_name || message.user.email}
                className="w-8 h-8 rounded-full"
              /> */}
              <div className={`p-3 rounded-lg ${message.user_id === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {/* <p className="text-sm font-semibold">{message.user.user_metadata.full_name || message.user.email}</p> */}
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{format(new Date(message.created_at), 'MMM d, yyyy HH:mm')}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}