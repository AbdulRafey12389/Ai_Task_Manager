// NODE MODULES...
import { Link } from 'react-router';
import React from 'react';

// COMPONENTS...
import { Button } from '@/components/ui/button';
import ProjectActionMenu from '@/components/ProjectActionMenu';

// ASSETS...
import { Hash, MoreHorizontal } from 'lucide-react';

// TYPES...
import type { Models } from 'appwrite';

type ProjectCardProps = {
  project: Models.Document;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className='group/card relative flex h-14 items-center gap-3 px-2 rounded-lg hover:bg-secondary'>
      <Hash
        color={project.color_hex}
        className='shrink-0'
      />

      <p className='text-sm truncate max-w-[48ch]'>{project.name}</p>

      {/* // ACTION MENU */}
      <ProjectActionMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          color_name: project.color_name,
          color_hex: project.color_hex,
        }}
      >
        <Button
          variant={'ghost'}
          size={'icon'}
          className='relative z-20 shrink-0 ms-auto opacity-0 group-hover/card:opacity-100 max-md:opacity-100'
          aria-label='More actions'
        >
          <MoreHorizontal />
        </Button>
      </ProjectActionMenu>

      <Link
        to={`/app/projects/${project.$id}`}
        className='absolute inset-0 z-10'
      />
    </div>
  );
};

export default ProjectCard;
