// NODE MODULES...
import { SignUp } from '@clerk/clerk-react';

// COMPONENTS...
import Head from '@/components/Head';

function RegisterPage() {
  return (
    <>
      <Head title='Create an Account — Tasky AI To-do List & Project Management App' />
      <section>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/login' />
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
