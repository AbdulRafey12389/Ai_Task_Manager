// NODE MODULES...
import React from 'react';

// COMPONENTS...
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import ProjectFormDialog from '@/components/ProjectFormDialog';
import { Button } from '@/components/ui/button';
import ProjectDeleteButton from '@/components/ProjectDeleteButton';

// ASSETS...
import { Edit } from 'lucide-react';

// TYPES...
import type { Project } from '@/types';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

interface projectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

const ProjectActionMenu: React.FC<projectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method='PUT'
            defaultFormData={defaultFormData}
          >
            <Button
              variant={'ghost'}
              size={'sm'}
              className='w-full justify-start px-2'
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActionMenu;
