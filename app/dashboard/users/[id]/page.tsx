import { getUserById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserById(id);
  console.log(user);

  console.log(user);
  return <main>hellooooo {user.name}</main>;
}
