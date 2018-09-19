'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoClass = function () {
    function ToDoClass() {
        _classCallCheck(this, ToDoClass);

        this.tasks = JSON.parse(localStorage.getItem('TASK_ID'));
        if (!this.tasks) {
            this.tasks = [{ task: 'Review code', isComplete: false }, { task: 'Commit code', isComplete: true }];
        }

        this.loadToDoList();
        this.addEventListener();
    }
    //keypress: enter


    _createClass(ToDoClass, [{
        key: 'addEventListener',
        value: function addEventListener() {
            var _this = this;

            document.getElementById('addTask').addEventListener('keypress', function (event) {
                if (event.keyCode === 13) {
                    _this.addTask(event.target.value);
                    event.target.value = "";
                }
            });
        }

        //check: checkbox status
        //index: The position of each line in the array task_value 

    }, {
        key: 'checkTodoStatus',
        value: function checkTodoStatus(index) {
            this.tasks[index].isComplete = !this.tasks[index].isComplete;
            this.loadToDoList();
        }
    }, {
        key: 'deleteTaskTodoList',
        value: function deleteTaskTodoList(event, taskIndex) {
            event.preventDefault();
            this.tasks.splice(taskIndex, 1);
            var x = localStorage.removeItem('TASK_ID');
            console.log(x);
            this.loadToDoList();
        }
    }, {
        key: 'addTaskClick',
        value: function addTaskClick() {
            var target = document.getElementById('addTask');
            this.addTask(target.value);
            target.value = "";
        }
    }, {
        key: 'addTask',
        value: function addTask(task) {
            var newTask = {
                task: task,
                isCompleted: false
            };

            //parent div is simply uses to add the effects around the insert label if there is a text or not
            var parentDiv = document.getElementById('addTask').parentElement;
            if (task === '') {
                parentDiv.classList.add('has-error');
            } else {
                parentDiv.classList.remove('has-error');
                parentDiv.classList.add('has-success');
                this.tasks.push(newTask);
                this.loadToDoList();
            }
        }

        //display all task

    }, {
        key: 'addTaskAllClick',
        value: function addTaskAllClick() {
            this.loadToDoList();
        }

        //display task don't active

    }, {
        key: 'addTaskActiveClick',
        value: function addTaskActiveClick() {
            var array_size = this.tasks.length;
            for (var i = 0; i < array_size; i++) {
                if (!this.tasks[i].isComplete) {
                    this.loadToDoList3();
                    // alert(this.tasks[i].task);
                }
            }
        }
        //task: completed

    }, {
        key: 'addTaskCompletedClick',
        value: function addTaskCompletedClick() {
            var array_size = this.tasks.length;
            for (var i = 0; i < array_size; i++) {
                if (this.tasks[i].isComplete) {
                    this.loadToDoList2();
                    // alert(this.tasks[i].task);

                }
            }
        }
    }, {
        key: 'generateTaskHtml',
        value: function generateTaskHtml(task, index) {
            return '\n            <li class="list-group-item checkbox">\n            <div class="row">\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">\n                <label><input id="checkTodoStatus" type="checkbox" onchange="toDoList.checkTodoStatus(' + index + ')" value="" class="" ' + (task.isComplete ? 'checked' : '') + '></label>\n                </div>\n                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ' + (task.isComplete ? 'complete' : '') + '">\n                ' + task.task + '\n                </div>\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">\n                <a class="" href="" onClick="toDoList.deleteTaskTodoList(event, ' + index + ')"><i id="deleteTaskTodoList" data-id="' + index + '" class="delete-icon glyphicon glyphicon-trash"></i></a>\n                </div>\n            </div>\n            </li>\n        ';
        }
    }, {
        key: 'generateTaskHtml2',
        value: function generateTaskHtml2(task, index) {
            if (this.tasks[index].isComplete) {
                return '\n            <li class="list-group-item checkbox">\n            <div class="row">\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">\n                <label><input id="checkTodoStatus" type="checkbox" onchange="toDoList.checkTodoStatus(' + index + ')" value="" class="" ' + (task.isComplete ? 'checked' : '') + '></label>\n                </div>\n                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ' + (task.isComplete ? 'complete' : '') + '">\n                ' + task.task + '\n                </div>\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">\n                <a class="" href="" onClick="toDoList.deleteTaskTodoList(event, ' + index + ')"><i id="deleteTaskTodoList" data-id="' + index + '" class="delete-icon glyphicon glyphicon-trash"></i></a>\n                </div>\n            </div>\n            </li>\n        ';
            } else {
                return '\n                <li class="list-group-item checkbox complete_test disabled"></li>\n            ';
            }
        }
    }, {
        key: 'generateTaskHtml3',
        value: function generateTaskHtml3(task, index) {
            if (!this.tasks[index].isComplete) {
                return '\n            <li class="list-group-item checkbox">\n            <div class="row">\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">\n                <label><input id="checkTodoStatus" type="checkbox" onchange="toDoList.checkTodoStatus(' + index + ')" value="" class="" ' + (task.isComplete ? 'checked' : '') + '></label>\n                </div>\n                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ' + (task.isComplete ? 'complete' : '') + '">\n                ' + task.task + '\n                </div>\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">\n                <a class="" href="" onClick="toDoList.deleteTaskTodoList(event, ' + index + ')"><i id="deleteTaskTodoList" data-id="' + index + '" class="delete-icon glyphicon glyphicon-trash"></i></a>\n                </div>\n            </div>\n            </li>\n        ';
            } else {
                return '\n            <li class="list-group-item checkbox complete_test"></li>\n            ';
            }
        }

        //load all task

    }, {
        key: 'loadToDoList',
        value: function loadToDoList() {
            var _this2 = this;

            localStorage.setItem('TASK_ID', JSON.stringify(this.tasks));
            var total_task = "Total: " + this.tasks.length + " tasks";
            document.getElementById('total_task').innerHTML = total_task;
            var taskHtml = this.tasks.reduce(function (html, task, index) {
                return html += _this2.generateTaskHtml(task, index);
            }, '');
            document.getElementById('taskList').innerHTML = taskHtml;
        }

        //task is completed

    }, {
        key: 'loadToDoList2',
        value: function loadToDoList2() {
            var _this3 = this;

            localStorage.setItem('TASK_ID', JSON.stringify(this.tasks));

            var taskHtml = this.tasks.reduce(function (html, task, index) {
                return html += _this3.generateTaskHtml2(task, index);
            }, '');
            document.getElementById('taskList').innerHTML = taskHtml;
        }

        //task is not completed

    }, {
        key: 'loadToDoList3',
        value: function loadToDoList3() {
            var _this4 = this;

            localStorage.setItem('TASK_ID', JSON.stringify(this.tasks));

            var taskHtml = this.tasks.reduce(function (html, task, index) {
                return html += _this4.generateTaskHtml3(task, index);
            }, '');
            document.getElementById('taskList').innerHTML = taskHtml;
        }
    }]);

    return ToDoClass;
}();

var toDoList = void 0;
window.addEventListener("load", function () {
    toDoList = new ToDoClass();
});