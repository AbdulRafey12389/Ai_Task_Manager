// NODE MODULES...

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
import { CalendarIcon, ChevronDown, Hash, Inbox, X } from 'lucide-react';

function Taskform() {
  return (
    <Card className='focus-within:border-foreground/30'>
      <CardContent className='p-2'>
        <Textarea
          className='!border-0 !ring-0 mb-2 p-1'
          placeholder='After finishing the project, Take a tour'
          autoFocus
        />

        <div className='ring-1 ring-border rounded-md max-w-max'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant={'ghost'}
                size={'sm'}
              >
                {' '}
                <CalendarIcon /> Due date
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
              <Calendar
                disabled={{ before: new Date() }}
                mode='single'
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                className='px-2 -ms-2'
                variant={'ghost'}
                size={'sm'}
                aria-label='Remove due date'
              >
                <X />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Remove due date</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>

      <Separator />

      <CardFooter>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'ghost'}
              role='combobox'
              aria-expanded={false}
              className='max-w-max'
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent>
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
      </CardFooter>
    </Card>
  );
}

export default Taskform;
