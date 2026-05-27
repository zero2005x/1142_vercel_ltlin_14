import FeaturedProducts_14 from './_components/home/FeaturedProducts_14';
import Hero_14 from './_components/home/Hero_14';
import { Suspense } from 'react';
import LoadingContainer from './_components/global/LoadingContainer';

const StorePage_14 = () => {
  return (
    <>
      <Hero_14 />
      {/* <LoadingContainer/> */}
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts_14 />
      </Suspense>
    </>
  );
};

export default StorePage_14;
