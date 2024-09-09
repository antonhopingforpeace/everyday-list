import { projects } from "./index.js";
import { createProject } from "./createToDo.js";

//Test if storage is available or supported
export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

//With this function i will store the projects in the local storage, i will create a new array
//in which i will store each element inside projects and then i will stringify it.
export function storeInLocalStorage() {
  const projectArray = [];

  projects.forEach((element) => {
    projectArray.push(element);
  });

  let projectsArrayString = JSON.stringify(projectArray);
  localStorage.setItem("__projectsArray", projectsArrayString);
}

//With this function, i will load the data that was stored in the local storage. Initially i will create the project objects with
//their correct class and within each project i will add the task objects withe the correct class.
export function loadDataOfLocalStorage() {
  const savedProjects = JSON.parse(localStorage.getItem("__projectsArray"));

  savedProjects.forEach((project, index) => {
    let title = project.title;
    let description = project.description;
    let tasks = project.tasks;

    projects.push(createProject(title, description));

    tasks.forEach((task,i) => {
      projects[index].addTask(task);
      projects[index].tasks[i].status = task.status;
    });
  });
}
