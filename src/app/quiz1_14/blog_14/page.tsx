'use client';

import { useState } from 'react';

import blogData_14 from '../_assets/data/blogData.json';
import Blog2_14 from '../_components/Blog2_14';
import Wrapper from '../_assets/wrapper/Blog2_14';
import Alert_14 from '../_components/Alert_14';

type BlogItem = {
  id: number;
  title: string;
  descrip: string;
  category: string;
  img: string;
};

type AlertState = {
  show: boolean;
  msg: string;
  type: 'success' | 'danger' | '';
};

const BlogLocalJsonPage2_14 = () => {
  const [name, setName] = useState('ltlin');
  const [id, setId] = useState(913410014);
  const [blogs_14, setBlogs_14] = useState<BlogItem[]>(blogData_14 as BlogItem[]);
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    msg: '',
    type: '',
  });

  const showAlert = (
    show = false,
    msg = '',
    type: AlertState['type'] = ''
  ) => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id: number) => {
    showAlert(true, 'blog removed', 'danger');
    setBlogs_14(blogs_14.filter((blog) => blog.id !== id));
  };

  const clearAllBlogs = () => {
    showAlert(true, 'clear all blogs', 'danger');
    setBlogs_14([]);
  };

  const loadAllBlogs = () => {
    showAlert(true, 'load all blogs', 'success');
    setBlogs_14([]);
    setBlogs_14(blogData_14);
  };

  return (
    <Wrapper>
      {alert.show && <Alert_14 alert={alert} showAlert={showAlert} />}
      <section className='blogs'>
        <div className='section-title'>
          <h2>
            blogs from local json -- {name}, {id}{' '}
          </h2>
        </div>
        <div className='blogs-center2'>
          {blogs_14.map((item) => {
            const { id, title, descrip, category, img } = item;
            return (
              <Blog2_14
                key={id}
                id={id}
                title={title}
                descrip={descrip}
                category={category}
                img={img}
                removeItem={removeItem}
              />
            );
          })}
        </div>
        <div className='flex justify-center items-center gap-8 mt-8'>
          <button
            type='button'
            className='text-red-700 bg-red-200 hover:bg-red-300 capitalize px-4 py-2 text-base rounded'
            onClick={clearAllBlogs}
          >
            clear all blogs
          </button>
          <button
            type='button'
            className='text-blue-700 bg-blue-200 hover:bg-blue-300 capitalize px-4 py-2 text-base rounded'
            onClick={loadAllBlogs}
          >
            load all blogs
          </button>
        </div>
      </section>
    </Wrapper>
  );
};

export default BlogLocalJsonPage2_14;
