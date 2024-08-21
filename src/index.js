import "./styles.css";
import {deleteProject,createProject} from "./createToDo.js"
import {createFirstProject} from "./initialPageTasks.js";

export const projects = [];

createFirstProject();

// deleteProject(projects,0);

console.log(projects);

projects.push(createProject("Second","Testing project to see if the second works"));

let sampleTask = {
    name:"Drive a car",
    description:"Trying to get my drivers license so i need to practice a lot before my exam",
    dueDate:"12/11/2024",
    priority:"High",
    status: "False"
};

projects[1].addTask(sampleTask);
projects[1].printTasks();


projects[1].tasks[0].changeStatus();
projects[1].printTasks();

projects[1].tasks[0].changeStatus();
projects[1].printTasks();