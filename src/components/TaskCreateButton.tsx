// NODE MODULES...

// COMPOENTS...
import { Button } from '@/components/ui/button';

// ASSETS...
import { CirclePlus } from 'lucide-react';
import React from 'react';

// TYPES...
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
};

export default TaskCreateButton;
