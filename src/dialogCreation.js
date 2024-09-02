import {projects, selectedProject} from "./index.js";
import {createProject} from "./createToDo.js"
import {displayProjects, displayTasks} from "./domViewTasksProjects.js"
import {format,parseISO} from 'date-fns';

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

        //Check if the inputs are empty as well
        if(flag && taskTitle!="" && taskDescription!="" && taskDueDate!=""){
            flag=false;
            event.preventDefault();
            
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
            
            //When the dialogs confirm button is pressed i want to view all the tasks
            // plus the new one
            displayTasks(selectedProject);
        }
        
    });
}

//View a dialog that is needed to edit a task
export function editTask(currentTask,i){
    const taskDialog = document.querySelector(".task-dialog");
    const closeTaskDialog = document.querySelector(".task-close-dialog");
    const confirmTaskDialog = document.querySelector(".task-confirm-dialog");
    
    taskDialog.showModal();
    let flag=true;

    const taskTitle = document.querySelector(".task-form-container #title");
    const taskDescription = document.querySelector(".task-form-container #description");
    const taskDueDate = document.querySelector(".task-form-container #dueDate");
    let taskPriority = document.getElementsByName("priority");

    //place in the dialog the previous values of the task before editing
    taskTitle.value = currentTask.title;
    taskDescription.value = currentTask.description;
    taskDueDate.value = format(new Date(currentTask.dueDate),'yyyy-MM-dd');
    // console.log(format(new Date(currentTask.dueDate),'yyyy/MM/dd'));

    for (let i = 0; i < taskPriority.length; i++) {
        
        if (taskPriority[i].value == currentTask.priority) {
            
            taskPriority[i].checked = true;
            break;
        }
    }

    closeTaskDialog.addEventListener("click", ()=>{
        taskDialog.close();
    });

    confirmTaskDialog.addEventListener("click", (event)=>{

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

        //Check if the inputs are empty as well
        if(flag && taskTitle!="" && taskDescription!="" && taskDueDate!="" && selected!=""){
            flag=false;
            event.preventDefault();
            
            //I must find a way to see in which project this new task will be added. 
            //This will be done initially by using a global variable called selectedProject which will change depending on the project that is selected.
            let newTask = {
                title: taskTitle,
                description:taskDescription,
                dueDate: taskDueDate,
                priority: selected,
            };

            //place in specific project and the specific task the new details
            projects[selectedProject].editTask(newTask,i);
            
            taskDialog.close();
            form.reset();
            //When the dialogs confirm button is pressed i want to view all the tasks
            // plus the new one
            displayTasks(selectedProject);
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

        const form = document.querySelector(".project-form-container form");
        const projectTitle = document.querySelector(".project-form-container #title").value;
        const projectDescription = document.querySelector(".project-form-container #description").value;

        //Check if the inputs are empty as well
        if(flag && projectTitle!="" && projectDescription!=""){
            flag=false;
            event.preventDefault();
            
            projects.push(createProject(projectTitle, projectDescription));
            
            form.reset();
            taskDialog.close();

            //When the dialogs confirm button is pressed i want to view all the projects
            // plus the new one
            displayProjects();
        }
        
    });
}

