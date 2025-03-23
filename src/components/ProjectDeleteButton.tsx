// NODE MODULES...
import React, { useCallback } from 'react';
import { useFetcher, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';

// CUSTOM MODULES...
import { truncateString } from '@/lib/utils';

// COMPONENTS...
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

// ASSETS...
import { Trash2 } from 'lucide-react';

// TYPES...
import type { Project } from '@/types';

type ProjectDeleteButtonProps = {
  defaultFormData: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const handleProjectDelete = useCallback(async () => {
    // NAVIGATE TO INBOX PAGE IF DELETING PROJECT FROM PROJECT DETAIL PAGE... (TO AVOID 404)

    if (location.pathname === `/app/projects/${defaultFormData.id}`) {
      navigate('/app/inbox');
    }

    const toastId = toast('Deleting Project...', {
      duration: Infinity,
    });

    try {
      await fetcher.submit(defaultFormData, {
        action: '/app/projects',
        method: 'DELETE',
        encType: 'application/json',
      });

      toast('Project Deleted', {
        id: toastId,
        description: `The project "${truncateString(defaultFormData.name, 32)}" has been deleted successfully.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast('Error Deleting project', {
        id: toastId,
        description: `An error occurred while deleting the project.`,
        duration: 5000,
      });
    }
  }, [defaultFormData, fetcher, navigate, location]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'sm'}
          className='w-full justify-start px-2 !text-destructive'
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{' '}
            project and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
