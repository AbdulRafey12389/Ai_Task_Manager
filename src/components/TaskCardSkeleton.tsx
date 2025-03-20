// NODE MODULES...

// COMPONENTS...
import { Skeleton } from '@/components/ui/skeleton';

const TaskCardSkeleton = () => {
  return (
    <div className='grid grid-cols-[max-content,1fr] gap-3 items-center bordr-b pt-2 pb-3.5'>
      <Skeleton className='w-5 h-5 rounded-full' />

      <Skeleton className='h-3 me-10' />
    </div>
  );
};

export default TaskCardSkeleton;
