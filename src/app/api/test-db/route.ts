import { NextResponse } from 'next/server';
import { prisma, prismaError } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: prismaError, env: !!process.env.DATABASE_URL },
      { status: 500 }
    );
  }
  try {
    const categories = await prisma.category_14.findMany({ take: 5 });
    const blogs = await prisma.blog_14.findMany({ take: 5 });
    return NextResponse.json({
      ok: true,
      categoryCount: categories.length,
      blogCount: blogs.length,
      categories,
      blogs,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
