import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import BlogsGrid2_14 from '../blogs/BlogsGrid2_14';
import { fetchFeaturedBlogs } from '../../_utils/action';

const FeaturedBlogs_14 = async () => {
  const blogs = await fetchFeaturedBlogs();
  // console.log('featured blogs', blogs);
  return (
    <section className='pt-24'>
      <SectionTitle text='featured blogs from local PostgreSQL' />
      <BlogsGrid2_14 blogs={blogs} />
    </section>
  );
};
export default FeaturedBlogs_14;
