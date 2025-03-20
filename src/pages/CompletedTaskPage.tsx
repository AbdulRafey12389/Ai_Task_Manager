// NODE MODULES...

import { useLoaderData } from 'react-router';

// COMPONENTS...
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page';

import TaskEmtyState from '@/components/TaskEmtyState';

import TaskCard from '@/components/TaskCard';

// TYPES...
import type { Models } from 'appwrite';

// ASSETS...
import { CheckCircle2 } from 'lucide-react';

const CompletedTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title='Completed - Tasky AI' />
      <TopAppBar
        title='Completed'
        taskCount={tasks.total}
      />

      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>

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

          {!tasks?.total && <TaskEmtyState type='upcoming' />}
        </PageList>
      </Page>
    </>
  );
};

export default CompletedTaskPage;
