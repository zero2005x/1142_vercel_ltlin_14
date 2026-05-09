export const dynamic = 'force-dynamic';

import { fetchGroceryItems } from '../../actions/grocery_action_14';
import Wrapper from '../_assets/wrapper/Grocery_14';
import Form from './_components/Form_14';
import Items from './_components/Items_14';

const GroceryPage_14 = async () => {
  const items = await fetchGroceryItems();

  return (
    <Wrapper>
      <section className='section-center'>
        <Form />
        <Items items={items} />
      </section>
    </Wrapper>
  );
};
export default GroceryPage_14;
