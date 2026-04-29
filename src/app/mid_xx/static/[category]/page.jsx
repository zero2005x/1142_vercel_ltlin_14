'use client';

import { useEffect, useState } from 'react';
import Product_xx from '../../_components/Product_xx';
import Wrapper from '../../_assets/wrappers/Shop_xx';

import { useParams } from 'next/navigation';

const FetchProductsByCategory_xx = () => {
  const [shop_xx, setShop_xx] = useState([]);
  const params = useParams();
  const cat = params.category;

  const fetchProductsFromNode = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/shop_xx/${cat}`);
      const data = await response.json();
      console.log('shop_xx data', data);
      if (data.length !== 0) {
        setShop_xx(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsFromNode();
  }, []);

  return (
    <Wrapper>
      <div className='shop-page'>
        <div className='section-title'>
          <h4> Hsingtai Chung, 123456789 </h4>
        </div>
        <div className='collection-page'>
          <h1 className='title capitalize'>{cat}</h1>
          <div className='items'>
            {shop_xx?.map((item) => {
              const { id, img_url, name, price } = item;
              return (
                <Product_xx
                  key={id}
                  img_url={img_url}
                  name={name}
                  price={price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FetchProductsByCategory_xx;
