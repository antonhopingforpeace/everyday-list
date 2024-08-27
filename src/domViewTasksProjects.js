import {projects, selectedProject} from "./index.js";
import { createAddButton } from "./domManipulation.js";

const mainPage = document.querySelector(".main");

//With this function i will display all the projects in the projects screen
export function displayProjects(){

    //each time the function is activated i want to delete the contents of main
    //And add the create new project button
    mainPage.innerHTML="";
    createAddButton("project");

    //for each project EXCEPT the first one, which is the starter page
    //i want to create a project div in which i will contain the following
    
    //In this div i also want to have the ability to press it and 
    //go within it, to see its tasks
    for(let i=1;i<projects.length;i++){
        
        let placementOfProject = document.createElement("div");
        placementOfProject.classList.add("grid-element");
        
        let projectTitle = document.createElement("h2");
        projectTitle.textContent = projects[i].title;
        placementOfProject.appendChild(projectTitle);

        let projectDescription = document.createElement("p");
        projectDescription.textContent = projects[i].description;
        placementOfProject.appendChild(projectDescription);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteProject");
        deleteButton.textContent = " X "
        deleteButton.addEventListener("click",(element) =>{
            element.target.parentElement.remove();
            projects.splice(i,1);
            mainPage.innerHTML = "";
            createAddButton("project");
            displayProjects();
            placementOfProject.removeEventListener("click",goToInnerProject);
        });

        placementOfProject.appendChild(deleteButton);
        mainPage.appendChild(placementOfProject);

        //Create an event listener in order to access the inner content of a project
        //Do this by adding a index so i know to which project i will be going in and accessing and assessing
        
        placementOfProject.addEventListener("click",()=>{
            selectedProject[0]=i;
        });

        placementOfProject.addEventListener("click",goToInnerProject);
    }
}

//Use it in the event listener when a project is pressed
function goToInnerProject(){
    console.log(selectedProject[0])
    viewInnerTasksOfProject(selectedProject[0]);
}

//With this function i will display all the tasks in the tasks screen or the projects inner screen
export function displayTasks(index){

    //each time the function is activated i want to delete the contents of main
    //And add the create new task button
    mainPage.innerHTML="";
    createAddButton("task");

    //display all the tasks in this for loop for the project
    for(let i=0;i<projects[index].tasks.length;i++){
        
        let placementOfTask = document.createElement("div");
        placementOfTask.classList.add("grid-element");
        
        let taskTitle = document.createElement("h2");
        taskTitle.textContent = projects[index].tasks[i].title;
        placementOfTask.appendChild(taskTitle);

        let taskDescription = document.createElement("p");
        taskDescription.textContent = projects[index].tasks[i].description;
        placementOfTask.appendChild(taskDescription);

        let taskDueDate = document.createElement("p");
        taskDueDate.textContent = projects[index].tasks[i].dueDate;
        placementOfTask.appendChild(taskDueDate);

        let taskPriority = document.createElement("h3");
        taskPriority.textContent = projects[index].tasks[i].priority;
        placementOfTask.appendChild(taskPriority);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteTask");
        deleteButton.textContent = " X "
        deleteButton.addEventListener("click",(element) =>{
            element.target.parentElement.remove();
            projects[index].removeTask(i);
            mainPage.innerHTML = "";
            createAddButton("task");
            displayTasks(index);
        });

        let statusButton = document.createElement("button");
        statusButton.classList.add("completeTask");
        statusButton.textContent = projects[index].tasks[i].status;
        statusButton.addEventListener("click",()=>{
            projects[index].tasks[i].changeStatus();
            statusButton.textContent = projects[index].tasks[i].status;
        })

        placementOfTask.appendChild(statusButton);
        placementOfTask.appendChild(deleteButton);
        mainPage.appendChild(placementOfTask);
    }
}

//View the inner tasks of a project, it will be called when a project is pressed
function viewInnerTasksOfProject(index){
    displayTasks(index);
}