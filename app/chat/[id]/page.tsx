'use client';

import { Chat } from '@/lib/chats';
import { domain } from '@/lib/domain';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}

function Content() {
  const { id } = useParams();
  const { isPending, error, data } = useQuery<Chat>({
    queryKey: [`chat-${id}`],
    queryFn: async () => {
      const response = await fetch(`${domain}/api/chats/${id}`);

      return await response.json();
    },
  });

  return (
    <div className="m-2">
      {isPending ? (
        <p>Loading..</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <p>{data.title}</p>
      )}
    </div>
  );
}
