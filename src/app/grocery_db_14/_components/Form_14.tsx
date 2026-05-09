import { addGroceryItem } from '../../../actions/grocery_action_14';

const Form_14 = () => {
  return (
    <form action={addGroceryItem}>
      <h4>grocery bud</h4>
      <div className='form-control'>
        <input type='text' name='name' className='form-input' />
        <button type='submit' className='btn'>
          add item
        </button>
      </div>
    </form>
  );
};
export default Form_14;
