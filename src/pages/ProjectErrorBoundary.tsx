// NODE MODULES...

// COMPONENTS...
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';

// ASSETS...
import { pageNotFound } from '@/assets';

const ProjectErrorBoundary = () => {
  return (
    <>
      <Head title='Project not found' />
      <TopAppBar title='Project not found' />

      <div className='grow container flex flex-col items-center justify-center'>
        <figure className='mt-10'>
          <img
            src={pageNotFound}
            alt='404 page not found'
            width={360}
            className=''
          />
        </figure>

        <h1 className='text-2xl font-semibold text-center mt-4 mb-2'>
          Project not found
        </h1>
        <p className='text-muted-foreground max-w-[40ch] text-center'>
          Uh-oh! no project matches with this ID. Double-check it or explore
          other projects!
        </p>
      </div>
    </>
  );
};

export default ProjectErrorBoundary;
