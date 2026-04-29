import { NextResponse } from 'next/server';
import { seedMidtermData } from '@/actions/shop.action_14';

export async function GET() {
  const result = await seedMidtermData();
  return NextResponse.json(result);
}