import { Metadata } from 'next';
import RegistrationForm from '../ui/RegistrationForm';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <main>
      <RegistrationForm />
    </main>
  );
}
