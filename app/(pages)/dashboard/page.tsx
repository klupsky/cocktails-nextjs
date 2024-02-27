import { auth } from '@/auth';
import { getUserFavourites } from '../../lib/data';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  console.log(user, 'user');
  const allUserFavourites = await getUserFavourites(user.email);
  console.log(allUserFavourites, 'allUserFavourites');

  return (
    <main>
      {user?.name} {user?.email}
    </main>
  );
}
