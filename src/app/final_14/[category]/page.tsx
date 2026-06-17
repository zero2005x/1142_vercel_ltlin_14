import Product_14 from '../_components/shop/Product_14';
import Wrapper from '../_assets/wrapper/Shop_14';

import { prisma } from '@/lib/prisma';

type Product = {
  pid: string;
  pname: string | null;
  cat_id: number | null;
  price: number | null;
  img_url: string | null;
  remote_img_url: string | null;
};

const FetchProductsByCategory_14 = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  console.log('category param:', category);

  if (!prisma) {
    return <div>Database connection is not configured</div>;
  }

  const categoryRecord = await prisma.category2_14.findFirst({
    where: { cname: category },
  });

  if (!categoryRecord) {
    return <div>Category not found</div>;
  }

  const shop2_14 = await prisma.shop2_14.findMany({
    where: { cat_id: categoryRecord.cid },
  });

  console.log('Products by category :', shop2_14);

  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h4> LT LIN, 913410014 </h4>
        </div>
        <div className='collection-page'>
          <h1 className='title'>{category}</h1>
          <div className='items'>
            {shop2_14?.map((item: Product) => {
              const { pid, img_url, pname, price } = item;
              return (
                <Product_14
                  key={pid}
                  pid={pid}
                  img_url={img_url ?? ''}
                  pname={pname ?? ''}
                  price={price ?? 0}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FetchProductsByCategory_14;
