'use client';
import { useEffect } from 'react';

type AlertState = {
  type: 'success' | 'danger' | '';
  msg: string;
};

type Alert14Props = {
  alert: AlertState;
  showAlert: () => void;
};

const Alert_14 = ({ alert, showAlert }: Alert14Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showAlert]);

  if (alert.type === 'success') {
    return (
      <p className='grid items-center text-center capitalize text-green-700 bg-green-200'>
        {alert.msg}
      </p>
    );
  } else if (alert.type === 'danger') {
    return (
      <p className='grid items-center text-center capitalize text-red-700 bg-red-200'>
        {alert.msg}
      </p>
    );
  }

  return null;
};

export default Alert_14;
