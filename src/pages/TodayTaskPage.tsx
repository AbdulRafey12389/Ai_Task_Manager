// NODE MODULES...
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import { startOfToday } from 'date-fns';

// COMPONENTS...
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmtyState from '@/components/TaskEmtyState';
import Taskform from '@/components/Taskform';
import TaskCard from '@/components/TaskCard';
import TaskCardSkeleton from '@/components/TaskCardSkeleton';

// ASSETS...
import { CheckCircle2 } from 'lucide-react';

// TYPES...
import type { Models } from 'appwrite';

function TodayTaskPage() {
  const [taskFormShow, setTaskFormShow] = useState(false);
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title='Today - Tasky AI' />
      <TopAppBar
        title='Today'
        taskCount={tasks.total}
      />

      <Page>
        <PageHeader>
          <PageTitle>Today</PageTitle>

          {tasks.total > 0 && (
            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
              <CheckCircle2 size={16} /> {tasks.total} tasks
            </div>
          )}
        </PageHeader>

        <PageList>
          {tasks?.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                dueDate={due_date}
                completed={completed}
                project={project}
              />
            ),
          )}

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}
          {!tasks?.total && !taskFormShow && <TaskEmtyState />}

          {taskFormShow && (
            <Taskform
              mode='create'
              defaultFormData={{
                content: '',
                due_date: startOfToday(),
                project: null,
              }}
              className='mt-1'
              onCencel={() => setTaskFormShow(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: '/app',
                  method: 'POST',
                  encType: 'application/json',
                });
                setTaskFormShow(false);
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
}

export default TodayTaskPage;
