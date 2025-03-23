// NODE MODULES...
import { useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router';

// COMPONENTS...
import Head from '../components/Head';
import TopAppBar from '../components/TopAppBar';
import { Button } from '@/components/ui/button';
import TaskCreateButton from '../components/TaskCreateButton';
import TaskEmtyState from '../components/TaskEmtyState';
import Taskform from '../components/Taskform';
import TaskCard from '../components/TaskCard';
import TaskCardSkeleton from '../components/TaskCardSkeleton';
import ProjectActionMenu from '@/components/ProjectActionMenu';
import { Page, PageHeader, PageList, PageTitle } from '../components/Page';

// ASSETS...
import { MoreHorizontal } from 'lucide-react';

// TYPES...
import type { Models } from 'appwrite';

const ProjectDetailPage = () => {
  const fetcher = useFetcher();
  const { project } = useLoaderData<{ project: Models.Document }>();

  // GET TASKS THAT ARE NOT COMPLETED...
  const projectTasks = project.tasks.filter(
    (i: Models.Document) => !i.completed,
  ) as Models.Document[];

  // SORT TASKS BY DUE DATE...
  projectTasks.sort((a, b) => {
    return a.due_data < b.due_date ? -1 : 1;
  });

  const [taskFormShow, setTaskFormShow] = useState<boolean>(false);

  return (
    <>
      <Head title={project.name + ' - Tasky AI'} />

      <TopAppBar title={project.name} />

      <Page>
        <PageHeader>
          <div className='flex items-center gap-3'>
            <PageTitle>{project.name}</PageTitle>

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
                className='w-8 h-8 shrink-0'
                aria-label='More actions'
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>

        <PageList>
          {projectTasks.map(({ $id, content, completed, due_date }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
            />
          ))}

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton onClick={() => setTaskFormShow(true)} />
          )}

          {!projectTasks.length && !taskFormShow && (
            <TaskEmtyState type='project' />
          )}

          {taskFormShow && (
            <Taskform
              mode='create'
              className='mt-1'
              onCencel={() => setTaskFormShow(false)}
              defaultFormData={{
                content: '',
                due_date: null,
                project: project.$id,
              }}
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
};

export default ProjectDetailPage;
