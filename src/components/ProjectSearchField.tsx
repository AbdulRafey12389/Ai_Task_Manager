// NODE MODULES...
import { cn } from '@/lib/utils';
import React from 'react';

// COMPONENTS...
import { Input } from '@/components/ui/input';

// ASSETS...
import { Search, Loader2 } from 'lucide-react';

// TYPES...
export type SearchingState = 'idle' | 'loading' | 'searching';

type ProjectSearchFieldProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  searchingState: SearchingState;
};

const ProjectSearchField: React.FC<ProjectSearchFieldProps> = ({
  handleChange,
  searchingState,
}) => {
  return (
    <div className='relative'>
      <Search
        size={18}
        className='absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none'
      />

      <Input
        type='text'
        name='q'
        placeholder='Search projects'
        className='px-8'
        onChange={handleChange}
      />

      <Loader2
        size={18}
        className={cn(
          'absolute top-2 right-2 text-muted-foreground pointer-events-none hidden',
          searchingState !== 'idle' && 'block animate-spin',
        )}
      />
    </div>
  );
};

export default ProjectSearchField;
