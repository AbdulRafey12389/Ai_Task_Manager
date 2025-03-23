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

          {!tasks?.total && <TaskEmtyState type='completed' />}
        </PageList>
      </Page>
    </>
  );
};

export default CompletedTaskPage;
