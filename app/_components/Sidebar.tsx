'use client';

import { Chat } from '@/lib/chats';
import { domain } from '@/lib/domain';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function Sidebar() {
  const { data } = useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch(`${domain}/api/chats`);

      return await response.json();
    },
  });

  return (
    <nav className="w-40 bg-gray-200 p-2 min-h-dvh flex flex-col">
      <Link href="/">Home</Link>

      {data?.map((chat) => (
        <Link href={`/chat/${chat.id}`} key={chat.id}>
          {chat.title}
        </Link>
      ))}
    </nav>
  );
}
