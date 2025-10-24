import { db } from '@/db';

export async function GET() {
  const chats = await db.query.chats.findMany({
    orderBy: (t, { asc }) => asc(t.createdAt),
  });

  return Response.json(chats);
}
