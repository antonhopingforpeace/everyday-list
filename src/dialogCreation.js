import {projects, selectedProject} from "./index.js";
import {createProject} from "./createToDo.js"

export function createNewTask(){
    const taskDialog = document.querySelector(".task-dialog");
    const closeTaskDialog = document.querySelector(".task-close-dialog");
    const confirmTaskDialog = document.querySelector(".task-confirm-dialog");
    
    taskDialog.showModal();
    let flag=true;


    closeTaskDialog.addEventListener("click", ()=>{
        taskDialog.close();
    });

    confirmTaskDialog.addEventListener("click", (event)=>{
        if(flag){
            flag=false;
            event.preventDefault();
            const form = document.querySelector(".task-form-container form");
            const taskTitle = document.querySelector(".task-form-container #title").value;
            const taskDescription = document.querySelector(".task-form-container #description").value;
            const taskDueDate = document.querySelector(".task-form-container #dueDate").value;
            let taskPriority = document.getElementsByName("priority");
            let selected;
            for(let i=0;i<taskPriority.length;i++){
                if(taskPriority[i].checked)
                  selected = taskPriority[i].value;
            }
            
            //I must find a way to see in which project this new task will be added. 
            //This will be done initially by using a global variable called selectedProject which will change depending on the project that is selected.
            let newTask = {
                title: taskTitle,
                description:taskDescription,
                dueDate: taskDueDate,
                priority: selected,
            };
            projects[selectedProject].addTask(newTask);
            
            // form.reset();
            taskDialog.close();
            
            //Testing to see if it works
            projects[0].printTasks();
        }
        
    });
}

export function createNewProject(){
    const taskDialog = document.querySelector(".project-dialog");
    const closeTaskDialog = document.querySelector(".project-close-dialog");
    const confirmTaskDialog = document.querySelector(".project-confirm-dialog");

    taskDialog.showModal();
    let flag=true;


    closeTaskDialog.addEventListener("click", ()=>{
        taskDialog.close();
    });

    confirmTaskDialog.addEventListener("click", (event)=>{
        if(flag){
        flag=false;
        event.preventDefault();
        const form = document.querySelector(".project-form-container form");
        const projectTitle = document.querySelector(".project-form-container #title").value;
        const projectDescription = document.querySelector(".project-form-container #description").value;
        
        projects.push(createProject(projectTitle, projectDescription));
        
        // form.reset();
        taskDialog.close();
        
        //Testing to see if it works
        console.log(projects);
        }
        
    });
}

