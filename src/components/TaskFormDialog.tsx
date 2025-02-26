// NODE MODULES...

// COMPONENTS...
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Taskform from '@/components/Taskform';

//TYPES...
import React, { PropsWithChildren } from 'react';

const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-0 border-0  !rounded-xl'>
        <Taskform />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
