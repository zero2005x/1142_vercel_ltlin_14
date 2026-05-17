import { auth } from '@clerk/nextjs/server';
import StoreSignInOut_14 from './StoreSignInOut_14';

const StoreSignInOutAuth_14 = async () => {
  const { userId } = await auth();
  const isAdminUser = Boolean(userId && userId === process.env.ADMIN_USER_ID);

  return <StoreSignInOut_14 isAdminUser={isAdminUser} />;
};

export default StoreSignInOutAuth_14;
