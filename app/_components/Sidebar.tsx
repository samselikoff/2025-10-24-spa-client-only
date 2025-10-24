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
    <nav className="w-40 bg-gray-100 min-h-dvh flex flex-col">
      <Link className="px-4 py-2 hover:bg-gray-200" href="/">
        Home
      </Link>

      {data?.map((chat) => (
        <Link
          className="px-4 py-2 hover:bg-gray-200"
          href={`/chat/${chat.id}`}
          key={chat.id}
        >
          {chat.title}
        </Link>
      ))}
    </nav>
  );
}
