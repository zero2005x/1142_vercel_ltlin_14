import Wrapper from '../_assets/wrappers/Shop_14';
import DeleteProduct_14 from './DeleteProduct_14';

const Product_14 = ({ pid, img_url, name, price }) => {
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
