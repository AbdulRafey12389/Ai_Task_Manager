// NODE MODULES...
import React, { createContext, useContext } from 'react';

// TYPES...
import type { Models } from 'appwrite';

type ProjectContextProps = {
  projects: Models.DocumentList<Models.Document>;
  children: React.ReactNode;
};

const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

export const ProjectProvider: React.FC<ProjectContextProps> = ({
  projects,
  children,
}) => {
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
