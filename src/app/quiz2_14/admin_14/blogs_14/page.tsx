import EmptyList from '../../_components/global/EmptyList';

import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconButton } from '../../_components/form/Buttons';
import FormContainer from '../../_components/form/FormContainer';
import { fetchAdminBlogs, deleteBlogAction } from '../../_utils/action';

import DeleteAllBlogs_14 from '../../_components/demo/DeleteAllBlogs_14';
import SeedAllBlogs_14 from '../../_components/demo/SeedBlogs_14';

export const dynamic = 'force-dynamic';

async function AdminBlogsPage() {
  const items = await fetchAdminBlogs();
  console.log('admin blogs', items);
  // if (items.length === 0) return <EmptyList />;
  return (
    <section>
      <div className='space-y-2'>
        <div className='flex items-center justify-between mr-16'>
          <h1 className='text-2xl text-bold'>Blogs_14</h1>
          <div className='flex items-center gap-x-4'>
            <Button asChild variant='default'>
              <Link href='/quiz2_14/admin_14/blogs_14/create'>Create New</Link>
            </Button>
            <DeleteAllBlogs_14 />
            <SeedAllBlogs_14 />
          </div>
        </div>
      </div>
      <Separator className='my-4' />
      <Table>
        <TableCaption className='capitalize'>
          total blogs : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => {
            const { id: blogId, title, category, featured } = item;
            return (
              <TableRow key={blogId}>
                <TableCell>
                  <Link href='#'>{blogId}</Link>
                </TableCell>
                <TableCell>
                  <Link href='#'>{title}</Link>
                </TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{featured ? 'true' : 'false'}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/quiz2_14/admin_14/blogs_14/${blogId}/edit`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteBlog blogId={blogId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function DeleteBlog({ blogId }: { blogId: string }) {
  const deleteBlog = deleteBlogAction.bind(null, { blogId });
  return (
    <FormContainer action={deleteBlog}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default AdminBlogsPage;
