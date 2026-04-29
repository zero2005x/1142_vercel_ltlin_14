import Wrapper from './_assets/wrappers/Shop_xx';
import Link from 'next/link';

import { prisma } from '@/lib/prisma';

const StaticPage_xx = async () => {
  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h4> Hsingtai Chung, 123456789 </h4>
        </div>
        <div className='homepage'>
          <div className='directory-menu'>Categories Items</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StaticPage_xx;
