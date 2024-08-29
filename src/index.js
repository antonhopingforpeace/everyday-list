import "./styles.css";
import {createProject} from "./createToDo.js"
import {createFirstProject} from "./initialPageTasks.js";
import {dashboard} from "./domManipulation.js";
export const projects = [];
export const selectedProject = [];

selectedProject[0] = 0;

//Create the first project, which will contain either nothing either the testing Tasks, in order to 
//Work on the dashboard
createFirstProject();

dashboard();

console.log(projects);

projects.push(createProject("Second","Testing project to see if the second works"));

let sampleTask = {
    title:"Drive aaaaaaaaaaaaa car",
    description:"Trying to get my drivers license so i need to practice a lot before my exam",
    dueDate:"12/11/2024",
    priority:"High",
    status: "False"
};

projects[1].addTask(sampleTask);