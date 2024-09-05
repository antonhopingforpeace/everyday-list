import {createProject} from "./createToDo.js"
import {projects} from "./index.js"


export function createFirstProject(){
    //In order to create the first project page which will be the main i will start by initializing the projects array 
    //with its first element in which i will contain the index tasks.
    projects.push(createProject("GENERAL TASKS", ""));
    
}










