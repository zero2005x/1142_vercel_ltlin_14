export const dynamic = 'force-dynamic';

import Wrapper from '../_assets/wrapper/Blog2_14';
import { fetchBlog_14 } from '@/actions/blog.action_14';
import Blog2_14 from '../_components/Blog2_14';
import DeleteAllBlogs_14 from '../_components/DeleteAllBlogs_14';
import SeedAllBlogs_14 from '../_components/SeedBlogs_14';

const P1_14 = async () => {
  const blogs_14 = await fetchBlog_14();
  return (
    <Wrapper>
      <section className='blogs'>
        <div className='section-title'>
          <h2>blogs from local PosgreSQL -- ltlin, 913410014</h2>

          <div className='blogs-center2'>
            {blogs_14.map((item) => {
              const { id, title, descrip, category, img } = item;
              return (
                <Blog2_14
                  key={id}
                  id={id}
                  title={title ?? ''}
                  descrip={descrip ?? ''}
                  category={category ?? ''}
                  img={img ?? ''}
                />
              );
            })}
          </div>
        </div>
      </section>
      <div className='flex justify-center items-center gap-8 mt-8'>
        <DeleteAllBlogs_14 />
        <SeedAllBlogs_14 />
      </div>
    </Wrapper>
  );
};

export default P1_14;
