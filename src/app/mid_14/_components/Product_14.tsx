import Wrapper from '../_assets/wrappers/Shop_14';
import DeleteProduct_14 from './DeleteProduct_14';

type Product14Props = {
  pid: number;
  img_url: string | null;
  name: string | null;
  price: number | null;
};

const Product_14 = ({ pid, img_url, name, price }: Product14Props) => {
  return (
    <Wrapper>
      <div className='collection-item'>
        <div
          className='image'
          style={{ backgroundImage: `url(${img_url || ''})` }}
        />
        <div className='collection-footer'>
          <span className='name'>{name}</span>
          <span className='price'>${price}</span>
        </div>
        <DeleteProduct_14 pid={pid} />
      </div>
    </Wrapper>
  );
};
export default Product_14;
