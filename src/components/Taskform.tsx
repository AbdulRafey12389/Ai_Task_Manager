// NODE MODULES...
import React, { useState, useEffect, useCallback } from 'react';
import * as chrono from 'chrono-node';

// CUSTOM MODULES...
import { formateCustomDate, getTaskDueDateColorClass, cn } from '@/lib/utils';

// COMPONENTS...
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';

// ASSETS...
import {
  CalendarIcon,
  ChevronDown,
  Hash,
  Inbox,
  SendHorizonal,
  X,
} from 'lucide-react';

// TYPES...
import type { ClassValue } from 'clsx';
import type { TaskForm } from '@/types';

type TaskformProps = {
  defaultFormData?: TaskForm;
  className?: ClassValue;
  mode: 'create' | 'edit';
  onCencel?: () => void;
  onSubmit?: (fromData: TaskForm) => void;
};

const DEFAULT_FORM_DATA: TaskForm = {
  content: '',
  due_date: null,
  completed: false,
  project: null,
};

const Taskform: React.FC<TaskformProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCencel,
  onSubmit,
}) => {
  const [taskContent, setTaskContent] = useState(defaultFormData.content);
  const [dueDate, setDueDate] = useState(defaultFormData.due_date);
  const [projectId, setProjectId] = useState(defaultFormData.project);

  const [projectName, setProjectName] = useState('');
  const [projectColorHex, setProjectColorHex] = useState('');

  const [dueDataOpen, setDueDataOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: taskContent,
      due_date: dueDate,
      project: projectId,
    }));
  }, [taskContent, dueDate, projectId]);

  useEffect(() => {
    const chronoParsed = chrono.parse(taskContent);

    if (chronoParsed.length > 0) {
      const lastDate = chronoParsed[chronoParsed.length - 1];
      setDueDate(lastDate.date());
    }
  }, [taskContent]);

  const handleSubmit = useCallback(() => {
    if (!taskContent) return;

    if (onSubmit) onSubmit(formData);

    setTaskContent('');
  }, [taskContent, onSubmit, formData]);

  return (
    <Card className={cn('focus-within:border-foreground/30', className)}>
      <CardContent className='p-2'>
        <Textarea
          className='!border-0 !ring-0 mb-2 p-1'
          placeholder='After finishing the project, Take a tour'
          autoFocus
          value={taskContent}
          onInput={(e) => setTaskContent(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <div className='ring-1 ring-border rounded-md max-w-max'>
          <Popover
            open={dueDataOpen}
            onOpenChange={setDueDataOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant={'ghost'}
                size={'sm'}
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                {' '}
                <CalendarIcon />
                {dueDate ? formateCustomDate(dueDate) : 'Due date'}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
              <Calendar
                // disabled={{ before: new Date() }}
                mode='single'
                initialFocus
                onSelect={(selected) => {
                  setDueDate(selected || null);
                  setDueDataOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  className='px-2 -ms-2'
                  variant={'ghost'}
                  size={'sm'}
                  aria-label='Remove due date'
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className='grid grid-cols-[minmax(0,1fr),max-content] gap-2 p-2'>
        <Popover
          open={projectOpen}
          onOpenChange={setProjectOpen}
          model
        >
          <PopoverTrigger asChild>
            <Button
              variant={'ghost'}
              role='combobox'
              aria-expanded={projectOpen}
              className='max-w-max'
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className='w-[240px] p-0'
            align='start'
          >
            <Command>
              <CommandInput placeholder='Search projects...' />

              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No project found.</CommandEmpty>

                  <CommandGroup>
                    <CommandItem>
                      <Hash /> project 1
                    </CommandItem>
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <Button
            variant={'secondary'}
            onClick={onCencel}
          >
            <span className='max-md:hidden'>Cancel</span>
            <X className='md:hidden' />
          </Button>

          <Button
            disabled={!taskContent}
            onClick={handleSubmit}
          >
            <span className='max-md:hidden'>
              {mode === 'create' ? 'Create' : 'Save'}
            </span>
            <SendHorizonal className='md:hidden' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Taskform;
