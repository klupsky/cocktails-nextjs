import { auth } from '@/auth';

export default async function Page() {
  let session = await auth();
  let user = session?.user;

  return (
    <main>
      {user?.name} {user?.email}
    </main>
  );
}
