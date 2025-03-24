// NODE MODULES...
import { redirect } from 'react-router';

// CUSTOM MODULES...
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';
import { generateProjectTasks } from '@/api/googlAi';

// ENVIRONMENT VARIABLES...
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

// TYPES...
import { ProjectForm, Project } from '@/types';
import type { ActionFunction } from 'react-router';
import type { Models } from 'appwrite';

type aiGenTask = {
  content: string;
  dueDate: Date | null;
};

// CREATE PROJECT FROM DATABASE...
const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  let aiGenetatedTasks: aiGenTask[] = [];

  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      generateID(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    );
  } catch (error) {
    console.error('Error creating project:', error);
  }

  // GENERATE TASK USING AI, IF AI TASK GENERATION IS ENABLED...
  if (aiTaskGen) {
    try {
      aiGenetatedTasks = JSON.parse(
        (await generateProjectTasks(taskGenPrompt)) || '',
      );

      console.log(aiGenetatedTasks);
    } catch (error) {
      console.error('Error generating a ai tasks:', error);
    }
  }

  // CREATE PROJECT TASKS  IF AI TASK GENETATION IS ENABLED AND TASK ARE GENERATED...

  if (aiGenetatedTasks.length) {
    const promises = aiGenetatedTasks.map((task) => {
      databases.createDocument(APPWRITE_DATABASE_ID, 'tasks', generateID(), {
        ...task,
        project: project?.$id,
        userId: getUserId(),
      });
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      console.log('Error creating AI project tasks: ', error);
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
};

// DELETE PROJECT FROM DATABASE...
const deleteProject = async (data: ProjectForm) => {
  const documentId = data.id;

  if (!documentId) throw new Error('No project found with this id.');

  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId,
    );
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

// UPDATE PROJECT FROM DATABASE...
const updateProject = async (data: Project) => {
  const documentId = data.id;

  if (!documentId) throw new Error('No project found with this id.');

  try {
    return await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId,
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
      },
    );
  } catch (error) {
    console.error('Error updating project:', error);
  }
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === 'POST') return await createProject(data);

  if (method === 'DELETE') return await deleteProject(data);

  if (method === 'PUT') return await updateProject(data);

  throw new Error('Invalid request method.');
};

export default projectAction;
