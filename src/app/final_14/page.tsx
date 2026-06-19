import { fetchCategory_14 } from './_utils/action';
import Wrapper from './_assets/wrapper/Shop_14';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function FinalHome_14() {
  let categories2_14: Awaited<ReturnType<typeof fetchCategory_14>> = [];
  let dbError: string | null = null;

  if (!prisma) {
    dbError = 'DATABASE_URL is not set on this environment.';
  } else {
    try {
      categories2_14 = await fetchCategory_14();
      console.log('Fetched categories:', categories2_14);
    } catch (error) {
      dbError =
        error instanceof Error ? error.message : 'Unknown database error';
      console.error('fetchCategory_14 failed:', error);
    }
  }

  if (dbError) {
    return (
      <div className='p-8'>
        <h2 className='text-xl font-semibold mb-2'>
          final_14: database connection failed
        </h2>
        <pre className='whitespace-pre-wrap text-sm text-red-600'>
          {dbError}
        </pre>
      </div>
    );
  }

  return (
    <>
      <Wrapper>
        <div className='shop-page'>
          <div className='section-title'>
            <h4> LT LIN, 913410014 </h4>
          </div>
          <div className='homepage'>
            <div className='directory-menu'>
              {categories2_14?.map((item) => {
                const { cid, cname, size, image_url } = item;
                return (
                  <div className={`${size} menu-item`} key={cid}>
                    <img
                      className='background-image'
                      src={image_url || 'default.jpg'}
                      alt=''
                    />
                    <Link href={`/final_14/${cname}`} className='content'>
                      <h1 className='title'>{item.cname}</h1>
                      <span className='subtitle'>SHOP NOW</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
