import {projects, selectedProject} from "./index.js";

export function createNewTask(){
    const taskDialog = document.querySelector(".task-dialog");
    const showTaskDialog = document.querySelector(".add-button");
    const closeTaskDialog = document.querySelector(".task-close-dialog");
    const confirmTaskDialog = document.querySelector(".task-confirm-dialog");

    taskDialog.showModal();


    closeTaskDialog.addEventListener("click", ()=>{
        taskDialog.close();
    });

    confirmTaskDialog.addEventListener("click", (event)=>{
        event.preventDefault();
        const form = document.querySelector("form");
        const taskTitle = document.querySelector(".task-form-container #title").value;
        const taskDescription = document.querySelector(".task-form-container #description").value;
        const taskDueDate = document.querySelector(".task-form-container #dueDate").value;
        let taskPriority = document.getElementsByName("priority");
        let selected;
        for(let i=0;i<taskPriority.length;i++){
            if(taskPriority[i].checked)
                selected = taskPriority[i].value;
        }
        //const taskPriority = document.querySelector("input[name='priority']:checked").value;
        //I must find a way to see in which project this new task will be added. 
        //This will be done initially by using a global variable called selectedProject which will change depending on the project that is selected.
        let newTask = {
            title: taskTitle,
            description:taskDescription,
            dueDate: taskDueDate,
            priority: selected,
        };
        projects[selectedProject].addTask(newTask);
        
        form.reset();
        taskDialog.close();
        
        //Testing to see if it works
        console.log("new");
        projects[0].printTasks();
    });
}


