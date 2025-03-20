// NODE MODULES...
import { databases, Query } from '@/lib/appwrite';

// CUSTOME  MODULES...
import { getUserId } from '@/lib/utils';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// TYPES...
import type { LoaderFunction } from 'react-router';

const getTask = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, 'tasks', [
      Query.equal('completed', true), // ONLY COMPLETED TASKS...
      Query.orderDesc('$updatedAt'), // ORDER BY LAST UPDATED...
      Query.equal('userId', getUserId()),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error('Error to getting completed task');
  }
};

const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTask();

  console.log(tasks);

  return { tasks };
};

export default completedTaskLoader;
