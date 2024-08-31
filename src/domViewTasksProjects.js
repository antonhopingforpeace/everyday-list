import {projects, selectedProject} from "./index.js";
import { createAddButton } from "./domManipulation.js";
import { editTask } from "./dialogCreation.js";

const mainPage = document.querySelector(".main");
const headerOfPage = document.getElementById("header");
const titleOfHeader = document.createElement("h1");
headerOfPage.appendChild(titleOfHeader);

//With this function i will display all the projects in the projects screen
export function displayProjects(){

    //each time the function is activated i want to delete the contents of main
    //And add the create new project button
    mainPage.innerHTML="";
    createAddButton("project");

    //Title for place where al projects are
    titleOfHeader.textContent = "PROJECTS";

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

        //Delete a project
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-project");
        deleteButton.textContent = " X "
        deleteButton.addEventListener("click",(element) =>{
            element.target.parentElement.remove();
            projects.splice(i,1);
            mainPage.innerHTML = "";
            createAddButton("project");
            displayProjects();
        });

        //Display the details of a project
        let detailsButton = document.createElement("button");
        detailsButton.classList.add("project-details");
        detailsButton.textContent = "MORE";
        detailsButton.addEventListener("click",(element)=>{
            if(detailsButton.textContent=="MORE"){
                placementOfProject.appendChild(projectDescription);
                placementOfProject.appendChild(deleteButton);
            }
            else{
                placementOfProject.removeChild(projectDescription);
                placementOfProject.removeChild(deleteButton);
            }
            detailsButton.textContent = detailsButton.textContent=="MORE" ? detailsButton.textContent="LESS" : detailsButton.textContent="MORE";
        });

        
        // placementOfProject.appendChild(deleteButton);
        placementOfProject.appendChild(detailsButton);
        mainPage.appendChild(placementOfProject);

        //Create an event listener in order to access the inner content of a project
        //Do this by adding a index so i know to which project i will be going in and accessing and assessing
        
        projectTitle.addEventListener("click",()=>{
            selectedProject[0]=i;
        });

        projectTitle.addEventListener("click",goToInnerProject);
    }
}

//Use it in the event listener when a project is pressed
function goToInnerProject(){
    viewInnerTasksOfProject(selectedProject[0]);
}

//View the inner tasks of a project, it will be called when a project is pressed
function viewInnerTasksOfProject(index){
    displayTasks(index);
}

//With this function i will display all the tasks in the tasks screen or the projects inner screen
export function displayTasks(index){

    //each time the function is activated i want to delete the contents of main
    //And add the create new task button
    mainPage.innerHTML="";
    createAddButton("task");

    //Add title to the page
    titleOfHeader.textContent = projects[index].title;

    //display all the tasks in this for loop for the project
    for(let i=0;i<projects[index].tasks.length;i++){
        
        let placementOfTask = document.createElement("div");
        placementOfTask.classList.add("grid-element");
        
        let taskTitle = document.createElement("h2");
        taskTitle.textContent = projects[index].tasks[i].title;
        placementOfTask.appendChild(taskTitle);

        let taskDescription = document.createElement("p");
        taskDescription.textContent = projects[index].tasks[i].description;

        let taskDueDate = document.createElement("p");
        taskDueDate.textContent = projects[index].tasks[i].dueDate;
        placementOfTask.appendChild(taskDueDate);

        let taskPriority = document.createElement("h3");
        taskPriority.textContent = projects[index].tasks[i].priority;
        if(taskPriority.textContent=="Low"){
            placementOfTask.style.backgroundColor = "green";
        }
        else if(taskPriority.textContent=="Medium"){
            placementOfTask.style.backgroundColor = "yellow";
        }
        else if(taskPriority.textContent=="High"){
            placementOfTask.style.backgroundColor = "orange";
        }

        //delete a task
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-task");
        deleteButton.textContent = " X "
        deleteButton.addEventListener("click",(element) =>{
            element.target.parentElement.remove();
            projects[index].removeTask(i);
            displayTasks(index);
        });

        //View more details in each task
        let detailsButton = document.createElement("button");
        detailsButton.classList.add("task-details");
        detailsButton.textContent = "MORE";
        detailsButton.addEventListener("click",()=>{
            if(detailsButton.textContent=="MORE"){
                placementOfTask.appendChild(taskDescription);
                placementOfTask.appendChild(deleteButton);
                placementOfTask.appendChild(statusButton);
                placementOfTask.appendChild(taskPriority);
                placementOfTask.appendChild(editButton);
            }
            else{
                placementOfTask.removeChild(taskDescription);
                placementOfTask.removeChild(deleteButton);
                placementOfTask.removeChild(statusButton);
                placementOfTask.removeChild(taskPriority);
                placementOfTask.removeChild(editButton);
            }
            detailsButton.textContent = detailsButton.textContent=="MORE" ? detailsButton.textContent="LESS" : detailsButton.textContent="MORE";
        });

        //Pressing on the edit button, a new dialog is created where i can edit the task
        let editButton = document.createElement("button");
        editButton.classList.add("edit-task");
        editButton.textContent = "Edit";
        editButton.addEventListener("click",()=>{
            const currentDetails = {
                title: taskTitle.textContent,
                description: taskDescription.textContent,
                DueDate: taskDueDate.textContent,
                priority: taskPriority.textContent,
            };
            
            //Activate this function, input are the details of the task and its placement in the project
            editTask(currentDetails,i);

            displayTasks(index);
        })

        //change the status of a task
        let statusButton = document.createElement("button");
        statusButton.classList.add("completeTask");
        statusButton.textContent = projects[index].tasks[i].status;
        statusButton.addEventListener("click",()=>{
            projects[index].tasks[i].changeStatus();
            statusButton.textContent = projects[index].tasks[i].status;
        });

        // placementOfTask.appendChild(statusButton);
        placementOfTask.appendChild(detailsButton);
        mainPage.appendChild(placementOfTask);
    }
}

