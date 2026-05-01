"use client";

import { createUser } from '@/actions/userAction_14';

const Form_14 = () => {
  return (
    <form action={createUser} className={formStyle}>
      <h2 className="text-xl capitalize">create user</h2>
      <label htmlFor="name" className="font-bold">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        className={inputStyle}
        placeholder="enter name"
      />
      <label htmlFor="email" className="font-bold">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className={inputStyle}
        placeholder="enter email"
      />
      <button type="submit" className={btnStyle}>Create User</button>
    </form>
  );
};

const formStyle = `w-full rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-start gap-4`;
const inputStyle = `w-full h-10 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
const btnStyle = `w-full h-10 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;

export default Form_14;
