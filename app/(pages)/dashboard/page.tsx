import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main>
      {user?.name} {user?.email}
    </main>
  );
}
