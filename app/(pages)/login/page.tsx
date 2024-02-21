import { Metadata } from 'next';
import LoginForm from '../../components/LoginForm/clientComponent';

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
