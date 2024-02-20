import { auth } from '@/auth';

export default async function Page({ params }: { params: { id: string } }) {
  let session = await auth();
  let user = session?.user;

  console.log(user, 'i am the user');
  return <main>{user.name} </main>;
}
