import { Metadata } from 'next';
import RegistrationForm from '../../components/RegistrationForm/clientComponent';

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
