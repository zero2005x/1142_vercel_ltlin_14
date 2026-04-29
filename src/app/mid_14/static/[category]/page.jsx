'use client';

import { useEffect, useState } from 'react';
import Product_14 from '../../_components/Product_14';
import Wrapper from '../../_assets/wrappers/Shop_14';

import { useParams } from 'next/navigation';

const FetchProductsByCategory_14 = () => {
  const [shop_14, setShop_14] = useState([]);
  const params = useParams();
  const cat = params.category;

  const fetchProductsFromNode = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/shop_14/${cat}`);
      const data = await response.json();
      console.log('shop_14 data', data);
      if (data.length !== 0) {
        setShop_14(data);
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
          <h4> LiangTing Lin, 913410014 </h4>
        </div>
        <div className='collection-page'>
          <h1 className='title capitalize'>{cat}</h1>
          <div className='items'>
            {shop_14?.map((item) => {
              const { id, img_url, name, price } = item;
              return (
                <Product_14
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

export default FetchProductsByCategory_14;
