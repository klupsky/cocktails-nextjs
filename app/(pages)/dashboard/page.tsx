import { auth } from '@/auth';
import { getUserFavourites } from '../../lib/data';

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    // Handle the case when user or user.email is not defined
    console.error('User or email is undefined or null.');
    return <main>Default Content</main>;
  }

  console.log(user, 'user');
  const allUserFavourites = await getUserFavourites(user.email);

  console.log(allUserFavourites, 'allUserFavourites');

  return (
    <main>
      {user.name} {user.email}
    </main>
  );
}
