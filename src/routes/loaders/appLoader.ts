// NODE MODULES...
import { databases, Query } from '@/lib/appwrite';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { redirect } from 'react-router';

// CUSTOME  MODULES...
import { getUserId } from '@/lib/utils';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// TYPES...
import type { LoaderFunction } from 'react-router';
import type { Models } from 'appwrite';

type TaskCounts = {
  inboxTask: number;
  todayTask: number;
};

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
  taskCount: TaskCounts;
};

const getProject = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, 'projects', [
      Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
      Query.orderDesc('$createdAt'),
      Query.limit(1000),
      Query.equal('userId', getUserId()),
    ]);
  } catch (error) {
    console.error('Error getting project with id: ', error);
    throw new Error('Error getting project with id');
  }
};

const getTaskCount = async () => {
  const taskCounts: TaskCounts = {
    inboxTask: 0,
    todayTask: 0,
  };

  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'tasks',
      [
        Query.select(['$id']),
        Query.isNull('project'),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId()),
      ],
    );

    taskCounts.inboxTask = totalInboxTasks;
  } catch (error) {
    console.error('Error getting inbox task count: ', error);
    throw new Error('Error getting inbox task count');
  }

  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'tasks',
      [
        Query.select(['$id']),
        Query.and([
          Query.greaterThanEqual('due_date', startOfToday().toISOString()),
          Query.lessThan('due_date', startOfTomorrow().toISOString()),
        ]),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId()),
      ],
    );

    taskCounts.todayTask = totalTodayTasks;
  } catch (error) {
    console.error('Error getting inbox task count: ', error);
    throw new Error('Error getting inbox task count');
  }

  return taskCounts;
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) redirect('/login');

  const projects = await getProject();
  const taskCount = await getTaskCount();

  return { projects, taskCount };
};

export default appLoader;
