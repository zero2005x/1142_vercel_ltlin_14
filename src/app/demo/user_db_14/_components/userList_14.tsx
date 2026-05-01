import { fetchUsers, updateUser } from '@/actions/userAction_14';
import DeleteButton_14 from './DeleteButton_14';

const UserList_14 = async () => {

    const { users, error } = await fetchUsers();

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-medium">User List</h2>

            {error ? (
                <pre className="whitespace-pre-wrap rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </pre>
            ) : users.length === 0 ? (
                <div className="rounded border border-dashed p-4 text-sm text-gray-500">No users found.</div>
            ) : (
                <ul className="space-y-4 text-sm">
                    {users.map((user) => {
                        const updateUserById = updateUser.bind(null, user.id);
 
                        return (
                            <li key={user.id} className="rounded-lg border border-gray-200 p-4 shadow-sm">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="font-semibold">User #{user.id}</div>
                                    <DeleteButton_14 id={user.id} />
                                </div>


                                <form action={updateUserById} className="grid gap-3 md:grid-cols-2">
                                    <div className="md:col-span-1">
                                        <label htmlFor={`name-${user.id}`} className="mb-1 block font-medium">Name</label>
                                        <input
                                            id={`name-${user.id}`}
                                            type="text"
                                            name="name"
                                            defaultValue={user.name ?? ''}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            placeholder="enter name"
                                        />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label htmlFor={`email-${user.id}`} className="mb-1 block font-medium">Email</label>
                                        <input
                                            id={`email-${user.id}`}
                                            type="email"
                                            name="email"
                                            defaultValue={user.email}
                                            required
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            className="rounded bg-emerald-500 px-3 py-2 text-white hover:bg-emerald-600"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default UserList_14;
