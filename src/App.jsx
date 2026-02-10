import { useState } from "react";
import { formatDate, getFromLStorage, removeFromLStorage, setToLStorage } from "./utility";
import NewProject from "./components/new-project";
import ProjectView from "./components/project-view";
import Sidebar from "./components/sidebar";
import NoProjectView from "./components/no-project-view";

const storageKeys = {
  NO_PROJECT_VIEW: 'noProject',
  NEW_PROJECT_VIEW: 'newProject',
  PROJECT_VIEW: 'projectView',
  ACTIVE_VIEW: 'activeView',
  PROJECTS: 'projects',
  ACTIVE_PROJECT: 'activeProject',
}

const activeView = {
  [storageKeys.NO_PROJECT_VIEW]: NoProjectView,
  [storageKeys.NEW_PROJECT_VIEW]: NewProject,
  [storageKeys.PROJECT_VIEW]: ProjectView
}

function App() {
  const [view, setView] = useState(getFromLStorage(storageKeys.ACTIVE_VIEW) ?? storageKeys.NO_PROJECT_VIEW);
  const [projects, setProjects] = useState(getFromLStorage(storageKeys.PROJECTS) ?? []);
  const [activeProject, setActiveProject] = useState(getFromLStorage(storageKeys.ACTIVE_PROJECT));

  const ActiveComponent = activeView[view];

  function clearActiveProject() {
    setActiveProject(null);
    removeFromLStorage(storageKeys.ACTIVE_PROJECT);
  }

  function handleProjectSelect(project) {
    recordActiveProject(project);
    updateView(storageKeys.PROJECT_VIEW);
  }

  function handleProjectAdd() {
    updateView(storageKeys.NEW_PROJECT_VIEW);
  }

  function handleNewProjectCancel() {
    updateView(activeProject
      ? storageKeys.PROJECT_VIEW
      : storageKeys.NO_PROJECT_VIEW
    );
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
        setToLStorage(storageKeys.PROJECTS, newProjects);
        return newProjects;
      });

      handleSave();
    }
  }

  function handleTaskAdd(text) {
    const newTask = {
        id: 0,
        text
    };
    activeProject.tasks.forEach(t => newTask.id = t.id > newTask.id
        ? t.id
        : newTask.id
    )
    newTask.id++;

    const newActiveProject = {...activeProject, tasks: [...activeProject.tasks, newTask]};
    updateActiveProject(newActiveProject);
  }

  function handleProjectDelete() {
    const newProjects = projects.filter(p => p.id !== activeProject.id);
    setNewProjects(newProjects);
    handleSave();
  }

  function handleTaskDelete(id) {
    const newActiveProject = {
      ...activeProject,
      tasks: activeProject.tasks.filter(t => t.id !== id)
    };
    updateActiveProject(newActiveProject);
  }

  function updateActiveProject(newProject) {
    const newProjects = projects.map(p => p.id === newProject.id
      ? newProject
      : p
    );

    setNewProjects(newProjects);
    recordActiveProject(newProject);
  }

  function recordActiveProject(newProject) {
    setToLStorage(storageKeys.ACTIVE_PROJECT, newProject);
    setActiveProject(newProject);
  }

  function updateView(view) {
    setToLStorage(storageKeys.ACTIVE_VIEW, view);
    setView(view);
  }

  function handleSave() {
    updateView(storageKeys.NO_PROJECT_VIEW);
    clearActiveProject();
  }

  function setNewProjects(projects) {
    setToLStorage(storageKeys.PROJECTS, projects);
    setProjects(projects);
  }

  return (
    <div className="flex h-[100%]">
      <Sidebar projects={projects}
        activeProject={activeProject}
        onProjectAdd={handleProjectAdd}
        onProjectSelect={handleProjectSelect}
        />

      <div className="w-[70%]">
        <ActiveComponent onProjectAdd={handleProjectAdd}
          onProjectDelete={handleProjectDelete}
          onSave={handleSave}
          onTaskAdd={handleTaskAdd}
          onTaskDelete={handleTaskDelete}
          project={activeProject}
          onNewProjectCancel={handleNewProjectCancel}
          onProjectSave={handleNewProjectSave} />
      </div>
    </div>
  );
}

export default App;
