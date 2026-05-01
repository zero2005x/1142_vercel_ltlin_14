import UserList_14 from "./_components/userList_14";
import Form2_14 from "./_components/Form2_14";

export const dynamic = "force-dynamic";

type UserPageProps = {
  searchParams?: Promise<{
    status?: string;
    message?: string;
  }>;
};

const UserPage_14 = async ({ searchParams }: UserPageProps) => {
  const params = searchParams ? await searchParams : undefined;
  const status = params?.status === "error" ? "error" : params?.status === "success" ? "success" : null;
  const message = params?.message?.trim();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">User DB_14</h1>
        <p className="text-sm text-gray-600">Create, edit, and delete users with Prisma server actions.</p>
      </div>

      {status && message ? (
        <div
          className={status === "success"
            ? "rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
            : "rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"}
        >
          {message}
        </div>
      ) : null}

      {/* <Form_14 /> */}
      <Form2_14 />
      <UserList_14 />
    </section>
  );
};

export default UserPage_14;
