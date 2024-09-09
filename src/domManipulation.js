import { createNewTask, createNewProject } from "./dialogCreation.js";
import { displayTasks, displayProjects } from "./domViewTasksProjects.js";
import { selectedProject } from "./index.js";

const mainPage = document.querySelector(".main");

export const dashboard = () => {
  //With this i take advantage of the Task button in the dashboard. By pressing on the Task button
  //I go to the home page in which i will add tasks.
  const homeButton = document.getElementById("tasks");

  //I will take advantage of the Projects button in the dashboard. By pressing on it, i go to a page where all the projects will
  //be visible and there will be a add project button
  const projectButton = document.getElementById("projects");

  //Initialize the webpage with the first page, containing the general tasks
  displayTasks(0);
  homeButton.style.backgroundColor = "red";
  projectButton.style.backgroundColor = "white";

  homeButton.addEventListener("click", () => {
    // mainPage.innerHTML="";
    // createAddButton("task");
    displayTasks(0);

    //Style the  tasks button when it is pressed
    homeButton.style.backgroundColor = "red";
    projectButton.style.backgroundColor = "white";
    selectedProject[0] = 0;
  });

  projectButton.addEventListener("click", () => {
    // mainPage.innerHTML="";
    // createAddButton("project");
    displayProjects();

    //Style the  projects button when it is pressed
    homeButton.style.backgroundColor = "white";
    projectButton.style.backgroundColor = "red";
  });
};

export function createAddButton(kindOfAddButton) {
  const addSection = document.createElement("div");
  addSection.classList.add("grid-element");

  const addButton = document.createElement("button");
  addButton.textContent = "  +  ";
  addButton.classList.add("add-button");

  addSection.appendChild(addButton);

  mainPage.appendChild(addSection);

  if (kindOfAddButton === "task") {
    //With this add button i can create new Tasks for a project
    addButton.addEventListener("click", () => {
      createNewTask();
    });
  } else if (kindOfAddButton === "project") {
    //With this add button i can create new Projects
    addButton.addEventListener("click", () => {
      createNewProject();
    });
  }
}
