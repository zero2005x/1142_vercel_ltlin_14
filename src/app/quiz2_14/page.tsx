import FeaturedBlogs_14 from './_components/home/FeaturedBlogs_14';
import { Suspense } from 'react';
import LoadingContainer from './_components/global/LoadingContainer';

export const dynamic = 'force-dynamic';

export default function Quiz2_14() {
  return (
    <>
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedBlogs_14 />
      </Suspense>
    </>
  );
}
