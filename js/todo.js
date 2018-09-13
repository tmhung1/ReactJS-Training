class ToDoClass {
    constructor() {

        this.tasks = JSON.parse(localStorage.getItem('TASK_ID'));
        if(!this.tasks){
            this.tasks =  [
                { task: 'Review code', isComplete: false },
                { task: 'Commit code', isComplete: true },
               
            ];
        }
        
        this.loadToDoList();
        this.addEventListener();
    }
    //keypress: enter
    addEventListener(){
        document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13 ){
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    //check: checkbox status
    //index: The position of each line in the array task_value 
    checkTodoStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadToDoList();
    }

    deleteTaskTodoList(event, taskIndex){
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        let x = localStorage.removeItem('TASK_ID');
        console.log(x);
        this.loadToDoList();
    }
    addTaskClick(){
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task){ 
        let newTask = {
            task,
            isCompleted: false,
        };
    
        //parent div is simply uses to add the effects around the insert label if there is a text or not
        let parentDiv = document.getElementById('addTask').parentElement;
        if(task === ''){
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            parentDiv.classList.add('has-success')
            this.tasks.push(newTask);
            this.loadToDoList();
        }
    }
    //display all task
    addTaskAllClick(){

    }
    //display task don't active
    addTaskActiveClick(){

    }
      //display task don't completed
    addTaskCompletedClick(){

    }

    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="checkTodoStatus" type="checkbox" onchange="toDoList.checkTodoStatus(${index})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
                ${task.task}
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="" onClick="toDoList.deleteTaskTodoList(event, ${index})"><i id="deleteTaskTodoList" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
                </div>
            </div>
            </li>
        `;
    }
    
    loadToDoList() {
      
        localStorage.setItem('TASK_ID', JSON.stringify(this.tasks));

        let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
    }
}

let toDoList;
window.addEventListener("load", () => {
    toDoList = new ToDoClass();
});