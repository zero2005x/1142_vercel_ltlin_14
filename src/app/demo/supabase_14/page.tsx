import { supabaseAdmin, supabaseAdminError } from '../lib/supabase/server';

export const dynamic = "force-dynamic";

type UserRow = {
    id: number;
    name: string | null;
    email: string;
};

type PostRow = {
    id: number;
    title: string;
    published: boolean;
    authorId: number | null;
};

const SupabasePage = async () => {
    if (!supabaseAdmin) {
        return (
            <section className="space-y-4">
                <h1 className="text-3xl font-semibold">Supabase_14</h1>
                <pre className="whitespace-pre-wrap rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {supabaseAdminError}
                </pre>
            </section>
        );
    }

    const [usersResult, postsResult] = await Promise.all([
        supabaseAdmin.from('User').select('id, name, email').order('id', { ascending: false }).limit(5),
        supabaseAdmin.from('Post').select('id, title, published, authorId').order('id', { ascending: false }).limit(5),
    ]);

    const users = (usersResult.data ?? []) as UserRow[];
    const posts = (postsResult.data ?? []) as PostRow[];

    return (
        <section className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold">Supabase_14</h1>
                <p className="text-sm text-gray-600">
                    This page reads data from Supabase REST API using the server-side secret key.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                    <h2 className="mb-3 text-xl font-medium">Latest Users</h2>
                    {usersResult.error ? (
                        <pre className="whitespace-pre-wrap text-sm text-red-600">
                            {usersResult.error.message}
                        </pre>
                    ) : (
                        <ul className="space-y-3 text-sm">
                            {users.map((user) => (
                                <li key={user.id} className="rounded border p-3">
                                    <div>ID: {user.id}</div>
                                    <div>Name: {user.name ?? 'null'}</div>
                                    <div>Email: {user.email}</div>
                                </li>
                            ))}
                            {users.length === 0 && <li>No users found.</li>}
                        </ul>
                    )}
                </div>

                <div className="rounded-lg border p-4">
                    <h2 className="mb-3 text-xl font-medium">Latest Posts</h2>
                    {postsResult.error ? (
                        <pre className="whitespace-pre-wrap text-sm text-red-600">
                            {postsResult.error.message}
                        </pre>
                    ) : (
                        <ul className="space-y-3 text-sm">
                            {posts.map((post) => (
                                <li key={post.id} className="rounded border p-3">
                                    <div>ID: {post.id}</div>
                                    <div>Title: {post.title}</div>
                                    <div>Published: {String(post.published)}</div>
                                    <div>Author ID: {post.authorId ?? 'null'}</div>
                                </li>
                            ))}
                            {posts.length === 0 && <li>No posts found.</li>}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SupabasePage;