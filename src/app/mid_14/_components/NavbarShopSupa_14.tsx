import Wrapper from '../_assets/wrappers/Shop_14';
import Link from 'next/link';

const NavbarShopSupa_14 = () => {
  return (
    <Wrapper>
      <div className='header'>
        <Link href='/mid_14' className='logo-container'>
          <img src='/images/midterm/assets/crown.svg' />
        </Link>
        <div className='options'>
          <Link href='/' className='option'>
            TKUdemo
          </Link>
          <Link href='/mid_14' className='option'>
            Shop
          </Link>
          <Link href='/mid_14' className='option'>
            Contact
          </Link>
          <Link href='/mid_14' className='option'>
            Sign In
          </Link>
          <div className='cart-icon'>
            <img
              className='shopping-icon'
              src='/images/midterm/assets/shopping-bag.svg'
              alt=''
            />
          </div>
          <div className='cart-dropdown'>
            <div className='cart-items'>
              <div className='cart-item'>
                <img src='/images/midterm/hats/brown-cowboy.png' alt='item' />
                <div className='item-details'>
                  <span className='name'>Brown Cowboy</span>
                  <span className='price'>4 * $35</span>
                </div>
              </div>
              <div className='cart-item'>
                <img
                  src='/images/midterm/jackets/blue-jean-jacket.png'
                  alt='item'
                />
                <div className='item-details'>
                  <span className='name'>Blue Jean Jacket</span>
                  <span className='price'>1 * $90</span>
                </div>
              </div>
            </div>
            <button className='custom-button'>GO TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavbarShopSupa_14;
