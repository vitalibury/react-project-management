import { useState } from "react";
import Sidebar from "./components/sidebar";
import { formatDate, getFromLStorage, removeFromLStorage, setToLStorage } from "./utility";
import NoProjectView from "./components/no-project-view";
import NewProject from "./components/new-project";

const storageKeys = {
  NO_PROJECT_VIEW: 'noProject',
  NEW_PROJECT_VIEW: 'newProject',
  PROJECT_VIEW: 'projectView',
}

const activeView = {
  [storageKeys.NO_PROJECT_VIEW]: NoProjectView,
  [storageKeys.NEW_PROJECT_VIEW]: NewProject,
  // [storageKeys.PROJECT_VIEW]: 2
}

function App() {
  const [view, setView] = useState(storageKeys.NO_PROJECT_VIEW);
  const [projects, setProjects] = useState(getFromLStorage('projects') ?? []);
  const [activeProject, setActiveProject] = useState(getFromLStorage('activeProject'));

  const ActiveComponent = activeView[view];

  // function updateProjects(projects) {
  //   setToLStorage('projects', projects);
  // }

  // function clearActiveProject() {
  //   setActiveProject(() => null);
  //   removeFromLStorage('activeProject');
  // }

  function handleProjectSelect(project) {
    setToLStorage('activeProject', project)
    setActiveProject(project);
    setView(storageKeys.PROJECT_VIEW);
  }

  function handleProjectAdd() {
    setView(storageKeys.NEW_PROJECT_VIEW);
  }

  function handleNewProjectSave(newProjectData) {
    const isTitleExists = projects.some(p => p.title.trim() === newProjectData.title.trim());

    if (isTitleExists) {
      confirm('The project with such name already exists. Try something different please.');
    } else {
      setProjects(prevProjects => {
        let newId = 0;

        if (prevProjects.length) {
          prevProjects.forEach(p => newId = p.id > newId ? p.id : newId);
          newId++;
        }
  
        const newProjects = [...prevProjects, {
          id: newId,
          ...newProjectData,
          date: formatDate(new Date(newProjectData.date)),
          tasks: []
        }];
        setToLStorage('projects', newProjects);
        return newProjects;
      });
      setView(storageKeys.NO_PROJECT_VIEW);
    }
  }

  return (
    <div className="flex h-[100%]">
      <Sidebar projects={projects}
        activeProject={activeProject}
        onProjectAdd={handleProjectAdd}
        // onProjectSelect={handleProjectSelect}
        />
      
      <div className="w-[70%]">
        <ActiveComponent onProjectAdd={handleProjectAdd}
          onCancel={() => setView(storageKeys.NO_PROJECT_VIEW)}
          onProjectSave={handleNewProjectSave} />
      </div>
    </div>
  );
}

export default App;
