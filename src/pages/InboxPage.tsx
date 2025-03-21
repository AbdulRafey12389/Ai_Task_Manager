// NODE MODULES...
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

// COMPONENTS...
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageList, PageTitle } from '@/components/Page';
import TaskCreateButton from '@/components/TaskCreateButton';
import TaskEmtyState from '@/components/TaskEmtyState';
import Taskform from '@/components/Taskform';
import TaskCard from '@/components/TaskCard';
import TaskCardSkeleton from '@/components/TaskCardSkeleton';

// TYPES...
import type { Models } from 'appwrite';

function InboxPage() {
  const [taskFormShow, setTaskFormShow] = useState(false);
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title='Inbox - Tasky AI' />
      <TopAppBar title='inbox' />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
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
          {!tasks?.total && !taskFormShow && <TaskEmtyState type='inbox' />}

          {taskFormShow && (
            <Taskform
              mode='create'
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

export default InboxPage;
