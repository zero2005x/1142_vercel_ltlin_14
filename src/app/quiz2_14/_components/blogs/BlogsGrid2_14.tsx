import Wrapper from '../../_assets/wrapper/Blog2_14';
import Blog2_14 from '../../_components/demo/Blog2_14';
import { typeBlog2_14 } from '../../_utils/action';

const BlogsGrid2_14 = ({ blogs }: { blogs: typeBlog2_14[] }) => {
  return (
    <Wrapper>
      <section className='blogs'>
        <div className='blogs-center2'>
          {blogs?.map((item) => {
            const { id, title, descrip, category, img } = item;
            return (
              <Blog2_14
                key={id}
                id={id}
                title={title}
                descrip={descrip}
                category={category}
                img={img}
              />
            );
          })}
        </div>
      </section>
    </Wrapper>
  );
};
export default BlogsGrid2_14;
