// NODE MOUDLES...
import { databases, Query } from '@/lib/appwrite';

// CUSTOM MODULES...
import { getUserId } from '@/lib/utils';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// TYPES...
import type { LoaderFunction } from 'react-router';

const getProjects = async (query: string) => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, 'projects', [
      Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
      Query.contains('name', query),
      Query.equal('userId', getUserId()),
      Query.orderDesc('$createdAt'),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error('Error to getting projects');
  }
};

const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  const projects = await getProjects(query);

  return { projects };
};

export default projectsLoader;
