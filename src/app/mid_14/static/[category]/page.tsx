export const dynamic = 'force-dynamic';

import Wrapper from '../../_assets/wrappers/Shop_14';
import { prisma } from '@/lib/prisma';

type ProductRecord = {
  pid: number;
  pname: string | null;
  price: number | null;
  remote_img_url: string | null;
  img_url: string | null;
};

type PageProps = {
  params: Promise<{ category: string }>;
};

// Try the external Node API first; fall back to Prisma if it isn't reachable.
async function getProductsByCategory(category: string): Promise<ProductRecord[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`http://localhost:5000/api/shop_14/${category}`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = (await res.json()) as Array<{
        pid?: number;
        id?: number;
        pname?: string | null;
        name?: string | null;
        price?: number | null;
        remote_img_url?: string | null;
        img_url?: string | null;
      }>;
      if (Array.isArray(data) && data.length > 0) {
        // Normalize Node API shape -> { pid, pname, price, remote_img_url }
        return data
          .map((item) => ({
            pid: item.pid ?? item.id,
            pname: item.pname ?? item.name ?? null,
            price: item.price ?? null,
            remote_img_url: item.remote_img_url ?? item.img_url ?? null,
            img_url: item.img_url ?? null,
          }))
          .filter(
            (item): item is ProductRecord => typeof item.pid === 'number'
          );
      }
    }
  } catch {
    // Node API not running or unreachable - fall through to Prisma.
  }

  if (!prisma) return [];
  const categoryData = await prisma.category_14.findFirst({
    where: { cname: category },
  });
  if (!categoryData) return [];
  return prisma.shop_14.findMany({
    where: { cat_id: categoryData.cid },
    select: {
      pid: true,
      pname: true,
      price: true,
      remote_img_url: true,
      img_url: true,
    },
  });
}

const FetchProductsByCategory_14 = async ({ params }: PageProps) => {
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
              products.map((product) => (
                <div key={product.pid} className='collection-item'>
                  <img
                    className='image'
                    src={product.remote_img_url || product.img_url || ''}
                    alt={product.pname || ''}
                  />
                  <div className='collection-footer'>
                    <span className='name'>{product.pname}</span>
                    <span className='price'>${product.price}</span>
                  </div>
                  <button className='custom-button'>Add to Cart</button>
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
