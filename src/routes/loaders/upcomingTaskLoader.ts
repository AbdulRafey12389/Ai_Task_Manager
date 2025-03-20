// NODE MODULES...
import { databases, Query } from '@/lib/appwrite';
import { startOfToday } from 'date-fns';

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
      Query.isNotNull('due_date'), // get tasks with due dates...
      Query.greaterThanEqual('due_date', startOfToday().toISOString()), // GET TASKS DUE DATES OR LATER...
      Query.orderAsc('due_date'), // Order tasks by due date
      Query.equal('userId', getUserId()),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error('Error to getting upcoming task');
  }
};

const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTask();

  return { tasks };
};

export default upcomingTaskLoader;
