'use client';

import { FaGlobe } from 'react-icons/fa6';
import { FaMugSaucer } from 'react-icons/fa6';
import Link from 'next/link';
import { deleteBlog_14 } from '@/actions/blog.action_14';

type Blog2_14 = {
  id: string;
  img: string;
  category: string;
  title: string;
  descrip: string;
};

const Blog2_14 = ({ id, img, category, title, descrip }: Blog2_14) => {
  return (
    <article key={id} className='blog'>
      <img src={img} alt='Coffee photo' className='img blog-img' />
      <div className='blog-content'>
        <span className='flex'>
          {category}
          {category === 'lifestyle' ? (
            <FaMugSaucer className='ml-1' color='blue' size={14} />
          ) : (
            <FaGlobe className='ml-1' color='blue' size={14} />
          )}
        </span>
        <h3>{title}</h3>
        <p>{descrip}</p>
        <div className='flex justify-between items-center'>
          <Link href='#'>read more</Link>
        </div>
      </div>
    </article>
  );
};

export default Blog2_14;
