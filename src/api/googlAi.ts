// NODE MODULES...

// CUSTOM MODULES...
import model from '@/lib/googlAi';

const generateProjectTasks = async (prompt: string) => {
  model.generationConfig = {
    responseMimeType: 'application/json',
  };

  try {
    const result =
      await model.generateContent(`Generate and return a list of tasks based on the provided prompt and the given JSON schema.
        
        Prompt: ${prompt}

        Tasks Schema: {
            content: string // Description of the task
            due_date: Date | null // Due date of the task, or null if no specific due date
        }

        Requirements:
        1. Ensure tasks align with the provided prompt.
        2. Set the 'due_date' relative to today's date: ${new Date()}.
        3. Return an array of tasks matching the schema.

        output: Array<Task>

        `);

    return result.response.text();
  } catch (error) {
    console.error('Error generating Ai tasks:', error);
  }
};

export { generateProjectTasks };
