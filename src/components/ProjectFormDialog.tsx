// NODE MODULES...
import React, { useState } from 'react';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';

// CUSTOM MODULES...
import { truncateString } from '@/lib/utils';

// TYPES...
import type { Project } from '@/types';

type ProjectFormDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: 'POST' | 'PUT';
};

// COMPONENTS...
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import ProjectForm from '@/components/ProjectForm';

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  defaultFormData,
  children,
  method,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const fetcher = useFetcher();

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-0 border-0 !rounded-xl'>
        <ProjectForm
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSumbit={async (formData) => {
            setOpen(false);

            const toastId = toast(
              method === 'POST'
                ? 'Creating Project...'
                : 'upgrading Project...',
              {
                duration: Infinity,
              },
            );

            fetcher.submit(JSON.stringify(formData), {
              action: '/app/projects',
              method,
              encType: 'application/json',
            });

            toast(method === 'POST' ? 'Project Created' : 'Project Updated', {
              id: toastId,
              description: `The Project ${truncateString(formData?.name, 32)} ${formData.ai_task_gen ? 'and its tasks' : ''} have been sucessfully ${method === 'POST' ? 'created' : 'updated'}.`,
              duration: 5000,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
