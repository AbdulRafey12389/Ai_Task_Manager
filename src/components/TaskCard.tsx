// NODE MODULES...
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useFetcher, useLocation } from 'react-router';
import { toast } from 'sonner';

// CUSTOM MODULES...
import {
  formateCustomDate,
  getTaskDueDateColorClass,
  truncateString,
} from '@/lib/utils';

// COMPONENTS...
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Taskform from '@/components/Taskform';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

// ASSETS...
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from 'lucide-react';

// TYPES...
import type { Models } from 'appwrite';
import type { Task } from '@/types';

type TaskCardProps = {
  id: string;
  content: string;
  dueDate: Date | null;
  completed?: boolean;
  project: Models.Document | null;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  dueDate,
  completed,
  project,
}) => {
  const [taskFormShow, setTaskFormShow] = useState(false);
  const fetcher = useFetcher();
  const location = useLocation();

  const fetcherTask = fetcher.json as Task;

  const task: Task = Object.assign(
    {
      id,
      content,
      due_date: dueDate,
      completed,
      project,
    },
    fetcherTask,
  );

  const handleTaskComplete = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(JSON.stringify({ id: task.id, completed }), {
        action: '/app',
        method: 'put',
        encType: 'application/json',
      });
    },
    [task.id, fetcher],
  );

  return (
    <>
      {!taskFormShow && (
        <div className='group/card relative grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b'>
          <Button
            variant={'outline'}
            size={'icon'}
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              task.completed && 'bg-border',
            )}
            role='checkbox'
            aria-checked={task.completed}
            aria-label={`Mark task as ${task.completed ? 'incompleted' : 'completed'}`}
            aria-describedby='task-content'
            onClick={async () => {
              await handleTaskComplete(!task.completed);

              if (!task.completed) {
                toast('1 task completed', {
                  action: {
                    label: 'Undo',
                    onClick: handleTaskComplete.bind(null, false),
                  },
                });
              }
            }}
          >
            <Check
              strokeWidth={4}
              className={cn(
                '!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                task.completed ? 'opacity-100' : 'opacity-0',
              )}
            />
          </Button>

          <Card className='rounded-none py-2 space-y-1.5 border-none'>
            <CardContent className='p-0 h-auto'>
              <p
                id='task-content'
                className={cn(
                  'text-sm max-md:me-16',
                  task.completed && 'text-muted-foreground line-through',
                )}
              >
                {task.content}
              </p>
            </CardContent>

            <CardFooter className='p-0  flex gap-4'>
              {task.due_date && (
                <div
                  className={cn(
                    'flex  items-center gap-1 text-xs text-muted-foreground',
                    getTaskDueDateColorClass(task.due_date, completed),
                  )}
                >
                  <CalendarDays size={14} />

                  {formateCustomDate(task.due_date)}
                </div>
              )}

              {location.pathname !== '/app/inbox' &&
                location.pathname !== `/app/projects/${project?.$id}` && (
                  <div className='grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground ms-auto'>
                    <div className='truncate text-right'>
                      {task.project?.name || 'Inbox'}
                    </div>

                    {task.project ? (
                      <Hash
                        size={14}
                        color={task.project.color_hex}
                      />
                    ) : (
                      <Inbox
                        size={14}
                        className='text-muted-foreground'
                      />
                    )}
                  </div>
                )}
            </CardFooter>
          </Card>

          <div className='absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hst(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100'>
            {!task.completed && (
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    className='h-6 w-6 text-muted-foreground'
                    aria-label='Edit task'
                    onClick={() => setTaskFormShow(true)}
                  >
                    <Edit size={14} />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <AlertDialog>
              <Tooltip>
                <AlertDialogTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      className='h-6 w-6 text-muted-foreground'
                      aria-label='Delete task'
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TooltipTrigger>
                </AlertDialogTrigger>

                <TooltipContent>Delete task</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>

                  <AlertDialogDescription>
                    The <strong>{truncateString(task.content, 48)}</strong> task
                    will be parmanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      fetcher.submit(JSON.stringify({ id: task.id }), {
                        action: '/app',
                        method: 'DELETE',
                        encType: 'application/json',
                      });
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
      {taskFormShow && (
        <Taskform
          className='my-1'
          defaultFormData={{
            ...task,
            project: project && project?.$id,
          }}
          mode='edit'
          onCencel={() => setTaskFormShow(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              method: 'PUT',
              action: '/app',
              encType: 'application/json',
            });

            setTaskFormShow(false);
          }}
        />
      )}
    </>
  );
};

export default TaskCard;
