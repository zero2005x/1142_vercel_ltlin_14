import Blog2_xx from '../_components/Blog2_xx';
import Wrapper from '../_assets/wrapper/Blog2_xx';
import Alert_xx from '../_components/Alert_xx';
import DeleteAllBlogs_xx from '../_components/DeleteAllBlogs_xx';
import SeedAllBlogs_xx from '../_components/SeedBlogs_xx';

import { prisma } from '@/lib/prisma';

type Blog = {
  id: number;
  img: string | null;
  category: string | null;
  title: string | null;
  descrip: string | null;
};

export const fetchBlog_xx = async () => {
  const blogs = await prisma.blog_xx.findMany();
  return blogs;
};

const P1_xx = async () => {
  const blogs_xx: Blog[] = await fetchBlog_xx();
  // console.log('blogs_xx:', blogs_xx);

  return (
    <Wrapper>
      <section className='blogs'>
        <div className='section-title'>
          <h2>blogs from local PosgreSQL -- htchung, 123456789</h2>
        </div>
        <div className='blogs-center2'>
          {blogs_xx?.map((item) => {
            const { id, title, descrip, category, img } = item;
            return (
              <Blog2_xx
                key={id}
                id={id}
                title={title || 'Untitled'}
                descrip={descrip || 'No description'}
                category={category || 'Uncategorized'}
                img={img || '/default-blog.jpg'}
              />
            );
          })}
        </div>
        <div className='flex justify-center items-center gap-8 mt-8'>
          <DeleteAllBlogs_xx />
          <SeedAllBlogs_xx />
        </div>
      </section>
    </Wrapper>
  );
};

export default P1_xx;
