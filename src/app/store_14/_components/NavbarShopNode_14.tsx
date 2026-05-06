import Link from "next/link";
import Wrapper from "../../_assets/wrapper/Navbar_14";

const NavbarShopNode_14 = () => {
  return (
    <Wrapper>
      <div className="header">
        <Link href="/mid_14" className="logo-container">
          <img src="/images/midterm/assets/crown.svg" />
        </Link>
        <div className="options">
          <Link href="/" className="option">
            TKUdemo
          </Link>
          <Link href="./overview.html" className="option">
            Shop
          </Link>
          <Link href="/shop" className="option">
            Contact
          </Link>
          <Link href="/signin" className="option">
            Sign In
          </Link>
          <div className="cart-icon">
            <img
              className="shopping-icon"
              src="/images/midterm/assets/shopping-bag.svg"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavbarShopNode_14;
