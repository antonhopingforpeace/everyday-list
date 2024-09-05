import "./styles.css";
// import {createProject} from "./createToDo.js"
import {createFirstProject} from "./initialPageTasks.js";
import {dashboard} from "./domManipulation.js";
import {loadDataOfLocalStorage, storageAvailable} from "./local-storage-functionality.js";
export const projects = [];
export const selectedProject = [];

selectedProject[0] = 0;

if(storageAvailable("localStorage")){

    if (localStorage.getItem("__projectsArray")) {
        loadDataOfLocalStorage();
    } 
    else {
        createFirstProject();
    }
    
    dashboard();
}
else{
    createFirstProject();
    dashboard();
}



//Create the first project, which will contain either nothing either the testing Tasks, in order to 
//Work on the dashboard
// createFirstProject();

// dashboard();
