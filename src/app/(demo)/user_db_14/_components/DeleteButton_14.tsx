import { removeUser } from '@/actions/userAction_14';

type DeleteButtonProps = {
  id: number;
};

const DeleteButton_14 = ({ id }: DeleteButtonProps) => {
  const removeUserWithId = removeUser.bind(null, id);

  return (
    <form action={removeUserWithId}>
      <input type="hidden" name="name" value="random" />
      <button
        type="submit"
        className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </form>
  );
};

export default DeleteButton_14;
