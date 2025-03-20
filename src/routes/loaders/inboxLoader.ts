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
      Query.equal('completed', false),
      Query.isNull('project'),
      Query.equal('userId', getUserId()),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error('Error to getting inbox task');
  }
};

const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTask();

  return { tasks };
};

export default inboxTaskLoader;
