import { db } from '@/db';
import { notFound } from 'next/navigation';

export type Chat = Awaited<ReturnType<typeof getChat>>;

export async function getChat(id: string) {
  const chat = await db.query.chats.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  if (!chat) {
    notFound();
  }

  return chat;
}
