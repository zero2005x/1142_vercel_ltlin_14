import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma, prismaError } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const requireAdmin = async () => {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    return false;
  }
  return true;
};

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!prisma) {
    return NextResponse.json(
      { error: prismaError },
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
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
