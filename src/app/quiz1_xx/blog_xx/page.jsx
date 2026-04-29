'use client';

import { useState } from 'react';

import blogData_xx from '../_assets/data/blogData.json';
import Blog2_xx from '../_components/Blog2_xx';
import Wrapper from '../_assets/wrapper/Blog2_xx';
import Alert_xx from '../_components/Alert_xx';

const BlogLocalJsonPage2_xx = () => {
  const [name, setName] = useState('htchung');
  const [id, setId] = useState(123456789);
  const [blogs_xx, setBlogs_xx] = useState(blogData_xx);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const removeItem = (id) => {
    showAlert(true, 'blog removed', 'danger');
    setBlogs_xx(blogs_xx.filter((blog) => blog.id !== id));
  };

  const clearAllBlogs = () => {
    showAlert(true, 'clear all blogs', 'danger');
    setBlogs_xx([]);
  };

  const loadAllBlogs = () => {
    showAlert(true, 'load all blogs', 'success');
    setBlogs_xx([]);
    setBlogs_xx(blogData_xx);
  };

  return (
    <Wrapper>
      {alert.show && <Alert_xx alert={alert} showAlert={showAlert} />}
      <section className='blogs'>
        <div className='section-title'>
          <h2>
            blogs from local json -- {name}, {id}{' '}
          </h2>
        </div>
        <div className='blogs-center2'>
          {blogs_xx.map((item) => {
            const { id, title, descrip, category, img } = item;
            return (
              <Blog2_xx
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

export default BlogLocalJsonPage2_xx;
