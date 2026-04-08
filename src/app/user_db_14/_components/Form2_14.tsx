"use client";

import { useActionState } from "react";
import { createUser2 } from "@/actions/userAction_14";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={btnStyle} disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const Form2_14 = () => {
  const [message, formAction] = useActionState(createUser2, null);
  
  return (
    <form action={formAction} className={formStyle}>
      {message && <p className="text-green-500 font-semibold">{message}</p>}
      <h2 className="text-xl capitalize">create user</h2>
      <label htmlFor="name" className="font-bold">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        className={inputStyle}
        placeholder="enter name"
      />
      <label htmlFor="email" className="font-bold">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className={inputStyle}
        placeholder="enter email"
      />
      <SubmitButton />
    </form>
  );
};

const formStyle = `w-full rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-start gap-4`;
const inputStyle = `w-full h-10 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`;
const btnStyle = `w-full h-10 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;

export default Form2_14;
