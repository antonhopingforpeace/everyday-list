import "./styles.css";
import {createProject} from "./createToDo.js"
import {createFirstProject} from "./initialPageTasks.js";
import {dashboard} from "./domManipulation.js";
export const projects = [];
export const selectedProject = [];

selectedProject[0] = 0;

dashboard();

createFirstProject();

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
projects[1].printTasks();


projects[1].tasks[0].changeStatus();
projects[1].printTasks();

projects[1].tasks[0].changeStatus();
projects[1].printTasks();
