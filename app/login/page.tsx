import { Metadata } from 'next';
import LoginForm from '../ui/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
