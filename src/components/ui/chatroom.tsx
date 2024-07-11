'use client'
import React, { useEffect, useState, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_metadata?: {
    name?: string;
    location?: string;
  };
}

interface ChatRoomProps {
  roomId: string;
  currentUser: User;
}

export default function ChatRoom({ roomId, currentUser }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser.user_metadata.name) {
      router.push('/private');
    }
  }, [currentUser, router]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        setError(`Failed to fetch messages: ${error.message}`);
      } else {
        const messagesWithUserData = await Promise.all(data.map(async (message) => {
          const { data: userData, error: userError } = await supabase
            .from('auth.users')
            .select('user_metadata')
            .eq('id', message.user_id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError);
            return message;
          }

          return {
            ...message,
            user_metadata: userData?.user_metadata
          };
        }));

        setMessages(messagesWithUserData);
        setError(null);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`room:${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, async (payload) => {
        const { data: userData, error: userError } = await supabase
          .from('auth.users')
          .select('user_metadata')
          .eq('id', payload.new.user_id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
        }

        const newMessage: Message = {
          ...payload.new as Message,
          user_metadata: userData?.user_metadata
        };
        setMessages((prev) => [...prev, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, supabase]);

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
      setError(`Failed to send message: ${error.message}`);
    } else {
      setNewMessage('');
      setError(null);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.user_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg ${message.user_id === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <p className="font-bold">{message.user_metadata?.name || 'Unknown User'}</p>
              <p className="text-sm italic">{message.user_metadata?.location || 'Unknown Location'}</p>
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{format(new Date(message.created_at), 'MMM d, yyyy HH:mm')}</p>
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