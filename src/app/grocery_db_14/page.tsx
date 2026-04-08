'use client';

import { useState, useEffect } from 'react';
import Form from './_components/Form_14';
import Items from './_components/Items_14';
import { ToastContainer, toast } from 'react-toastify';
import { fetchGroceryItems, deleteGroceryItem, toggleGroceryItem } from '../../actions/grocery_action_14';

import Wrapper from '../_assets/wrapper/Grocery_14';

interface GroceryItem {
  name: string;
  completed: boolean;
  id: string;
}

const GroceryPage_14 = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  const loadItems = async () => {
    const dbItems = await fetchGroceryItems();
    setItems(dbItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const removeItem = async (itemId: string) => {
    await deleteGroceryItem(itemId);
    await loadItems();
    toast.success('item deleted');
  };

  const editItem = async (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    await toggleGroceryItem(itemId, !item.completed);
    await loadItems();
  };

  return (
    <Wrapper>
      <section className='section-center'>
        <ToastContainer position='top-center' />
        <Form onItemAdded={loadItems} />
        <Items items={items} removeItem={removeItem} editItem={editItem} />
      </section>
    </Wrapper>
  );
};
export default GroceryPage_14;
