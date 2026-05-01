export const dynamic = 'force-dynamic';

import Wrapper from '../_assets/wrappers/Shop_14';
import DeleteProduct_14 from '../_components/DeleteProduct_14';

import { prisma } from '@/lib/prisma';

type Product = {
  pid: number;
  pname: string | null;
  cat_id: number | null;
  price: number | null;
  img_url: string | null;
  remote_img_url: string | null;
};

async function getProductsByCategory(category: string) {
  if (!prisma) return [];
  const categoryData = await prisma.category_14.findFirst({
    where: { cname: category },
  });
  if (!categoryData) return [];
  return prisma.shop_14.findMany({ where: { cat_id: categoryData.cid } });
}

const FetchProductsByCategory_14 = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const products = await getProductsByCategory(category);

  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h4> LiangTing Lin, 913410014 </h4>
        </div>
        <div className='collection-page'>
          <h1 className='title capitalize'>{category}</h1>
          <div className='items'>
            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              products.map((product: Product) => (
                <div key={product.pid} className='collection-item'>
                  <div
                    className='image'
                    style={{
                      backgroundImage: `url(${product.remote_img_url || ''})`,
                    }}
                  />
                  <div className='collection-footer'>
                    <span className='name'>{product.pname}</span>
                    <span className='price'>${product.price}</span>
                  </div>
                  <DeleteProduct_14 pid={product.pid} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FetchProductsByCategory_14;
