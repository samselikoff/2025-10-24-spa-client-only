import { db } from '@/db';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Page(props: PageProps<'/chat/[id]'>) {
  return (
    <Suspense>
      <Content params={props.params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<'/chat/[id]'>, 'params'>) {
  const { id } = await params;
  const chat = await db.query.chats.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  if (!chat) {
    notFound();
  }

  return (
    <div className="m-2">
      <h1>{chat?.title}</h1>
    </div>
  );
}
