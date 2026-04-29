'use client';

import { useState, useEffect } from 'react';
import Form from './_components/Form_14';
import { nanoid } from 'nanoid';
import Items from './_components/Items_14';
import { ToastContainer, toast } from 'react-toastify';

import Wrapper from '../_assets/wrapper/Grocery_14';

// 1. Fix the utility function
const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const listString = localStorage.getItem('list');
    if (listString) {
      return JSON.parse(listString);
    } else {
      return [];
    }
  }
  return [];
};

const setLocalStorage = (items: any[]) => {
  localStorage.setItem('list', JSON.stringify(items));
};

interface GroceryItem {
  name: string;
  completed: boolean;
  id: string;
}

const GroceryPage_14 = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    const storedList = getLocalStorage();
    if (storedList.length > 0) {
      setItems(storedList);
    }
  }, []);

  const addItem = (itemName: string) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('item added to the list');
  };

  const removeItem = (itemId: string) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('item deleted');
  };

  const editItem = (itemId: string) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
  };
  return (
    <Wrapper>
      <section className='section-center'>
        <ToastContainer position='top-center' />
        <Form addItem={addItem} />
        <Items items={items} removeItem={removeItem} editItem={editItem} />
      </section>
    </Wrapper>
  );
};
export default GroceryPage_14;
