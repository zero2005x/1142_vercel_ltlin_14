export const dynamic = 'force-dynamic';

import Wrapper from './_assets/wrappers/Shop_14';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import { midtermCategories } from './_assets/midterm-data';

async function getCategories() {
  if (!prisma) return midtermCategories;
  try {
    const categories = await prisma.category_14.findMany({ take: 5 });
    return categories.length > 0 ? categories : midtermCategories;
  } catch {
    return midtermCategories;
  }
}

const MidPage_14 = async () => {
  const categories = await getCategories();

  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h4> LiangTing Lin, 913410014 </h4>
        </div>
        <div className='homepage'>
          <div className='directory-menu'>
            {categories.map((category) => (
              <div key={category.cid} className='menu-item'>
                <img
                  className='background-image'
                  src={category.remote_image_url || ''}
                  alt=''
                />
                <Link href={`/mid_14/${category.cname}`} className='content'>
                  <h1 className='title'>{category.cname?.toUpperCase()}</h1>
                  <span className='subtitle'>SHOP NOW</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default MidPage_14;
