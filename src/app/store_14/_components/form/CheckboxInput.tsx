'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};

function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxInputProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className='flex items-center space-x-2'>
      <input type='hidden' name={name} value={checked ? 'on' : 'off'} />
      <Checkbox
        id={name}
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <label
        htmlFor={name}
        className='text-sm leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
    </div>
  );
}
export default CheckboxInput;
