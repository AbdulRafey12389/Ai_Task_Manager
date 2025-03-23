// NODE MODULES...
import { databases } from '@/lib/appwrite';

// CUSTOM MODULES...
import { getUserId } from '@/lib/utils';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// TYPES...
import type { LoaderFunction } from 'react-router';

const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      projectId,
    );

    if (project.userId !== getUserId()) {
      throw new Error(
        "You don't have permission to view this project - (Unauthorized)",
      );
    }

    return project;
  } catch (error) {
    console.error('Error getting project with id: ', error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error getting project with id');
  }
};

const projectsDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };

  const project = await getProject(projectId);

  return { project };
};

export default projectsDetailLoader;
