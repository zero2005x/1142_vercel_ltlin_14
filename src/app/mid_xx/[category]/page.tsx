import Product_xx from '../_components/Product_xx';
import Wrapper from '../_assets/wrappers/Shop_xx';

import { prisma } from '@/lib/prisma';

type Product = {
  pid: number;
  pname: string | null;
  cat_id: number | null;
  price: number | null;
  img_url: string | null;
  remote_img_url: string | null;
};

const FetchProductsByCategory_xx = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  console.log('category param:', category);
  // console.log('Products by category :', shop_xx);

  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h4> Hsingtai Chung, 123456789 </h4>
        </div>
        <div className='collection-page'>
          <h1 className='title'>{category}</h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default FetchProductsByCategory_xx;
