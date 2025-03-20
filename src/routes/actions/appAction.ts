// NODE MODULES...

// CUSTOM MODULES...
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';

// TYPES...
import type { ActionFunction } from 'react-router';
import type { Task } from '@/types';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// CREATE TASK FORM APPWRITE DATABASE...
const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      generateID(),
      { ...data, userId: getUserId() },
    );
  } catch (error) {
    console.log(error);
  }
};

// EDIT TASK FORM APPWRITE DATABASE...
const updateTask = async (data: Task) => {
  const documentId = data.id;

  if (!documentId) throw new Error('Task id is required.');

  delete data.id;

  try {
    return databases.updateDocument(
      APPWRITE_DATABASE_ID,
      'tasks',
      documentId,
      data,
    );
  } catch (error) {
    console.log('UPDATING TASK ERROR: ', error);
  }
};

// DELETE TASK FORM APPWRITE DATABASE...
const deleteTask = async (data: Task) => {
  const documentId = data.id;

  if (!documentId) throw Error('Task id is not found.');

  try {
    await databases.deleteDocument(APPWRITE_DATABASE_ID, 'tasks', documentId);
  } catch (error) {
    console.log('error to deleting task: ', error);
  }
};

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task;

  if (request.method === 'POST') {
    return createTask(data);
  }

  if (request.method === 'PUT') {
    return await updateTask(data);
  }
  if (request.method === 'DELETE') {
    return await deleteTask(data);
  }
};

export default appAction;
