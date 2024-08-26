//add ways in order to interact with the tasks and projects button. CHECK

//when going to the tasks i will see the general tasks.
//and there will be a plus sign button somewhere in order
//to add new notes. CHECK 

// when i go to the projects i will see all the current
//projects, there will be a plus button to add new projects. CHECK

// Create the projects DOM in order to visualize them, each time a new DOM element is created i will add a dataset so i now its place.

//once i create a new project i will go in it and 
// there i can add new tasks.

//each task will have a delete button and by pressing a 
// task it will expand. The same thing goes for the 
// projects button.

//I want to be able to edit all the details for each task
//and project
import {createNewTask, createNewProject} from "./dialogCreation.js";

const mainPage = document.querySelector(".main");

export const dashboard = () =>{

    //With this i take advantage of the Task button in the dashboard. By pressing on the Task button
    //I go to the home page in which i will add tasks.
    const homeButton = document.getElementById("tasks");

    //I will take advantage of the Projects button in the dashboard. By pressing on it, i go to a page where all the projects will 
    //be visible and there will be a add project button
    const projectButton = document.getElementById("projects");

    homeButton.addEventListener("click", ()=>{
        mainPage.innerHTML="";
        createAddButton("task");

        //Style the  tasks button when it is pressed 
        homeButton.style.backgroundColor="red";
        projectButton.style.backgroundColor="white"
    });
    
    projectButton.addEventListener("click", () =>{
        mainPage.innerHTML="";
        createAddButton("project");

        //Style the  projects button when it is pressed 
        homeButton.style.backgroundColor="white";
        projectButton.style.backgroundColor="red"
    });


}

function createAddButton(kindOfAddButton){
    
    const addSection = document.createElement("div");
    addSection.classList.add("grid-element");

    const addButton = document.createElement("button");
    addButton.textContent="  +  "
    addButton.classList.add("add-button");

    addSection.appendChild(addButton);

    mainPage.appendChild(addSection);

    if(kindOfAddButton==="task"){
        //With this add button i can create new Tasks for a project
        addButton.addEventListener("click",()=>{
            createNewTask();
        });
    }
    else if(kindOfAddButton==="project"){
        //With this add button i can create new Projects
        addButton.addEventListener("click",()=>{
            createNewProject();
        });
    }
    
}
