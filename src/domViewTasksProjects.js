import { projects, selectedProject } from "./index.js";
import { createAddButton } from "./domManipulation.js";
import { editTask } from "./dialogCreation.js";
import { format } from "date-fns";

const mainPage = document.querySelector(".main");
const headerOfPage = document.getElementById("header");
const headerDiv = document.createElement("div");
headerDiv.classList.add("header-div");

const titleOfHeader = document.createElement("h1");
titleOfHeader.classList.add("header-title");
const backButton = document.createElement("button");
backButton.classList.add("header-back");

headerDiv.appendChild(backButton);
headerDiv.appendChild(titleOfHeader);
headerOfPage.appendChild(headerDiv);
let flagOpener = false;

//With this function i will display all the projects in the projects screen
export function displayProjects() {
  //Make the back button disappear when the button for projects is pressed
  backButton.textContent = "";

  //each time the function is activated i want to delete the contents of main
  //And add the create new project button
  mainPage.innerHTML = "";
  createAddButton("project");

  //Title for place where al projects are
  titleOfHeader.textContent = "PROJECTS";

  //for each project EXCEPT the first one, which is the starter page
  //i want to create a project div in which i will contain the following

  //In this div i also want to have the ability to press it and
  //go within it, to see its tasks
  for (let i = 1; i < projects.length; i++) {
    let placementOfProject = document.createElement("div");
    placementOfProject.classList.add("grid-element");
    placementOfProject.classList.add("longer-grid-element");

    let projectTitle = document.createElement("h2");
    projectTitle.textContent = projects[i].title;
    projectTitle.classList.add("project-header");
    placementOfProject.appendChild(projectTitle);

    let projectDescription = document.createElement("p");
    projectDescription.textContent = projects[i].description;
    projectDescription.classList.add("descriptionProject");

    //Delete a project
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project");
    deleteButton.textContent = " X ";
    deleteButton.addEventListener("click", (element) => {
      element.target.parentElement.remove();
      projects.splice(i, 1);
      mainPage.innerHTML = "";
      createAddButton("project");
      displayProjects();
    });

    //Display the details of a project
    let detailsButton = document.createElement("button");
    detailsButton.classList.add("project-details");
    detailsButton.textContent = "▼";
    detailsButton.addEventListener("click", () => {
      if (detailsButton.textContent == "▼") {
        placementOfProject.removeChild(detailsButton);
        placementOfProject.appendChild(projectDescription);
        placementOfProject.appendChild(section);
        placementOfProject.appendChild(detailsButton);
      } else {
        placementOfProject.removeChild(projectDescription);
        placementOfProject.removeChild(section);
      }
      detailsButton.textContent =
        detailsButton.textContent == "▼"
          ? (detailsButton.textContent = "▲")
          : (detailsButton.textContent = "▼");
    });

    let section = document.createElement("div");
    section.classList.add("middle-buttons");
    section.appendChild(deleteButton);

    // placementOfProject.appendChild(deleteButton);
    placementOfProject.appendChild(detailsButton);
    mainPage.appendChild(placementOfProject);

    //Create an event listener in order to access the inner content of a project
    //Do this by adding a index so i know to which project i will be going in and accessing and assessing

    projectTitle.addEventListener("click", () => {
      selectedProject[0] = i;
    });

    projectTitle.addEventListener("click", goToInnerProject);
  }
}

//Use it in the event listener when a project is pressed
function goToInnerProject() {
  viewInnerTasksOfProject(selectedProject[0]);
}

//View the inner tasks of a project, it will be called when a project is pressed
function viewInnerTasksOfProject(index) {
  displayTasks(index);
}

//With this function i will display all the tasks in the tasks screen or the projects inner screen
export function displayTasks(index) {
  //each time the function is activated i want to delete the contents of main
  //And add the create new task button
  mainPage.innerHTML = "";
  createAddButton("task");

  //Add title to the page
  titleOfHeader.textContent = projects[index].title;

  if (index != 0) {
    flagOpener = true;

    backButton.textContent = "«««";
    backButton.addEventListener("click", () => {
      displayProjects();
      backButton.textContent = "";
    });
  } else {
    if (flagOpener) {
      backButton.textContent = "";
      flagOpener = false;
    }
  }

  //display all the tasks in this for loop for the project
  for (let i = 0; i < projects[index].tasks.length; i++) {
    let placementOfTask = document.createElement("div");
    placementOfTask.classList.add("grid-element");

    let taskTitle = document.createElement("h2");
    taskTitle.textContent = projects[index].tasks[i].title;
    // placementOfTask.appendChild(taskTitle);

    let taskDescription = document.createElement("p");
    taskDescription.classList.add("descriptionTask");
    taskDescription.textContent = projects[index].tasks[i].description;

    let taskDueDate = document.createElement("p");
    taskDueDate.style.fontSize = "1.8vh";
    taskDueDate.textContent = projects[index].tasks[i].dueDate;
    taskDueDate.textContent = format(
      new Date(taskDueDate.textContent),
      "MMMM do yyyy",
    );
    // placementOfTask.appendChild(taskDueDate);

    let taskPriority = document.createElement("h3");
    taskPriority.textContent = projects[index].tasks[i].priority;
    if (taskPriority.textContent == "Low") {
      placementOfTask.style.border = "3px solid lime";
      placementOfTask.style.backgroundColor = "rgb(163, 270, 180)";
    } else if (taskPriority.textContent == "Medium") {
      placementOfTask.style.border = "3px solid yellow";
      placementOfTask.style.backgroundColor = "rgb(240, 240, 203)";
    } else if (taskPriority.textContent == "High") {
      placementOfTask.style.border = "3px solid red";
      placementOfTask.style.backgroundColor = "rgb(243, 187, 187)";
    }

    //delete a task
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-task");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", (element) => {
      element.target.parentElement.remove();
      projects[index].removeTask(i);
      displayTasks(index);
    });

    //View more details in each task
    let detailsButton = document.createElement("button");
    detailsButton.classList.add("task-details");
    detailsButton.textContent = "▼";
    // detailsButton.textContent="MORE"
    detailsButton.addEventListener("click", () => {
      if (detailsButton.textContent == "▼") {
        placementOfTask.removeChild(footer);
        placementOfTask.appendChild(taskDescription);
        placementOfTask.appendChild(section);
        // placementOfTask.appendChild(deleteButton);
        // placementOfTask.appendChild(editButton);
        placementOfTask.appendChild(footer);
      } else {
        placementOfTask.removeChild(taskDescription);
        placementOfTask.removeChild(section);
        // placementOfTask.removeChild(deleteButton);
        // placementOfTask.removeChild(editButton);
      }
      detailsButton.textContent =
        detailsButton.textContent == "▼"
          ? (detailsButton.textContent = "▲")
          : (detailsButton.textContent = "▼");
    });

    //Pressing on the edit button, a new dialog is created where i can edit the task
    let editButton = document.createElement("button");
    editButton.classList.add("edit-task");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      const currentDetails = {
        title: taskTitle.textContent,
        description: taskDescription.textContent,
        dueDate: format(
          new Date(projects[index].tasks[i].dueDate),
          "yyyy-MM-dd",
        ),
        priority: taskPriority.textContent,
      };

      //Activate this function, input are the details of the task and its placement in the project
      editTask(currentDetails, i);

      displayTasks(index);
    });

    let section = document.createElement("div");
    section.classList.add("middle-buttons");
    section.appendChild(deleteButton);
    section.appendChild(editButton);

    //change the status of a task
    let statusButton = document.createElement("button");
    statusButton.classList.add("complete-task");
    statusButton.textContent = "";
    projects[index].tasks[i].status == "incomplete"
      ? (statusButton.style.backgroundColor = "white")
      : (statusButton.style.backgroundColor = "black");
    statusButton.addEventListener("click", () => {
      projects[index].tasks[i].changeStatus();
      projects[index].tasks[i].status == "incomplete"
        ? (statusButton.style.backgroundColor = "white")
        : (statusButton.style.backgroundColor = "black");
    });

    //create a footer for the task where the date and details button will be
    let footer = document.createElement("div");
    footer.classList.add("task-footer");
    footer.appendChild(taskDueDate);
    footer.appendChild(detailsButton);

    //create a header for the task where the title and the completed sign will be
    let header = document.createElement("div");
    header.classList.add("task-header");
    header.appendChild(statusButton);
    header.appendChild(taskTitle);

    // placementOfTask.appendChild(statusButton);
    placementOfTask.appendChild(header);
    placementOfTask.appendChild(footer);
    mainPage.appendChild(placementOfTask);
  }
}
