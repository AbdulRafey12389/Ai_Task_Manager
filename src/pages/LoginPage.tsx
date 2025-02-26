// NODE MODULES...
import { SignIn } from '@clerk/clerk-react';

// COMPONENTS...
import Head from '@/components/Head';

function LoginPage() {
  return (
    <>
      <Head title='Log In to Tasky AI — Manage To-do List and Projects' />
      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  );
}

export default LoginPage;
