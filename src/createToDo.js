//Create a Task class where only the container exists
//The dueDate must change in order to include more details
//With this object i will make new tasks
class Task{
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; 
        this.priority = priority;
        this.status = "incomplete";
    }

    changeStatus(){
        this.status = (this.status=="incomplete") ? "complete" : "incomplete";
    }


}

//This is the object that will be used to make new projects
class Project{
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.tasks = [];
    }

    removeTask(index){
        this.tasks.splice(index,1);
    }

    printTasks(){
        this.tasks.forEach(element =>{
            console.log(element);
            console.log("");
        })
    }

    addTask(task){
        let newTask = createTask(task);
        this.tasks.push(newTask);
    }
}

export function createTask(task){
    let newTask = new Task(task.title, task.description, task.dueDate, task.priority, task.status);
    return newTask;
}

export function createProject(title,description){
    let newProject = new Project(title,description);
    return newProject;
}

export function deleteProject(projects,index){
    projects.splice(index,1);
}

