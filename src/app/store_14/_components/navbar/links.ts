type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/store_14', label: 'home' },
  { href: '/store_14/about_14', label: 'about' },
  { href: '/store_14/products_14', label: 'products' },
  { href: '/store_14/favorites_14', label: 'favorites' },
  { href: '/store_14/cart_14', label: 'cart' },
  { href: '/store_14/orders_14', label: 'orders' },
  { href: '/store_14/reviews_14', label: 'reviews' },
];

export const linksAdmin: NavLink[] = [
  { href: '/store_14/admin_14', label: 'dashboard' },
  { href: '/store_14/admin_14/products_14', label: 'products' },
  { href: '/store_14/admin_14/sales_14', label: 'sales' },
];
