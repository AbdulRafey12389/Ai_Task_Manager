// NODE MODULES...
import { databases, Query } from '@/lib/appwrite';
import { startOfToday, startOfTomorrow } from 'date-fns';

// CUSTOME  MODULES...
import { getUserId } from '@/lib/utils';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// TYPES...
import type { LoaderFunction } from 'react-router';

const getTask = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, 'tasks', [
      Query.equal('completed', false),
      Query.and([
        Query.greaterThanEqual('due_date', startOfToday().toISOString()),
        Query.lessThanEqual('due_date', startOfTomorrow().toISOString()),
      ]), // only due today
      Query.equal('userId', getUserId()),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error('Error to getting today task');
  }
};

const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTask();

  console.log(tasks);

  return { tasks };
};

export default todayTaskLoader;
