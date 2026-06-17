import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { seedMidtermData } from '@/actions/shop.action_14';

export async function GET() {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const result = await seedMidtermData();
  return NextResponse.json(result);
}
