// NODE MODULES...
import { useState, useEffect } from 'react';
import { useFetcher, useLocation } from 'react-router';

// COMPONENTS...
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Taskform from '@/components/Taskform';

//TYPES...
import React, { PropsWithChildren } from 'react';
import { startOfToday } from 'date-fns';

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const [Open, setOpen] = useState(false);
  const location = useLocation();
  const fetcher = useFetcher();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        const target = event.target as HTMLElement;
        if (target.localName === 'textarea') return;
        event.preventDefault();

        setOpen(true);
      }
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, []);

  return (
    <Dialog
      open={Open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-0 border-0  !rounded-xl'>
        <Taskform
          defaultFormData={{
            content: '',
            due_date:
              location.pathname === '/app/today' ? startOfToday() : null,
            projectId: null,
          }}
          mode='create'
          onCencel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'POST',
              encType: 'application/json',
            });

            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
