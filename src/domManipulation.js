//add ways in order to interact with the tasks and projects button

//when going to the tasks i will see the general tasks
//and there will be a plus sign button somewhere in order
//to add new notes

// when i go to the projects i will see all the current
//projects, there will be a plus button to add new projects
//once i create a new project i will go in it and 
// there i can add new tasks.

//each task will have a delete button and by pressing a 
// task it will expand. The same thing goes for the 
// projects button.

//I want to be able to edit all the details for each task
//and project
import {createNewTask} from "./dialogCreation.js";

const mainPage = document.querySelector(".main");

export const dashboard = () =>{

    //With this i take advantage of the Task button in the dashboard. By pressing on the Task button
    //I go to the home page in which i will add tasks.
    const homeButton = document.getElementById("tasks");

    homeButton.addEventListener("click", ()=>{
        mainPage.innerHTML="";
        createAddTaskButton();
    });
}

function createAddTaskButton(){
    
    const addSection = document.createElement("div");
    addSection.classList.add("grid-element");

    const addButton = document.createElement("button");
    addButton.textContent="  +  "
    addButton.classList.add("add-button");

    addSection.appendChild(addButton);

    mainPage.appendChild(addSection);

    //With this add button i can create new Tasks for a project
    addButton.addEventListener("click",()=>{
        createNewTask();
    });
}



