import Wrapper from '../../_assets/wrapper/Shop_14';
import DeleteProduct_14 from './DeleteProduct_14';

const Product_14 = ({ img_url, pname, price, pid }) => {
  return (
    <Wrapper>
      <div className='collection-item'>
        <img className='image' src={img_url} />
        <div className='collection-footer'>
          <span className='name'>{pname}</span>
          <span className='price'>{price}</span>
        </div>
        <div className='flex justify-between items-center gap-4 custom-button'>
          <button>Add to Cart</button>
          {/* <DeleteProduct_14 pid={pid} /> */}
        </div>
      </div>
    </Wrapper>
  );
};
export default Product_14;
