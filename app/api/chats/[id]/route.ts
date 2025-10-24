import { db } from '@/db';
import { notFound } from 'next/navigation';

export async function GET(
  request: Request,
  ctx: RouteContext<'/api/chats/[id]'>
) {
  const { id } = await ctx.params;

  const chat = await db.query.chats.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  if (!chat) {
    notFound();
  }

  return Response.json(chat);
}
