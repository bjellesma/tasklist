import { Component } from '@angular/core';
import {TabComponent} from '../tabs/tab.component'
import {TaskService, TabService} from '../../services/app.service';
import {UsersService} from '../../../users/users.service';
import {Task} from '../../../Task';
import {Tabs} from '../../../Tabs';

@Component({
  //in order to use the relative path, we need to include the following line
  moduleId: module.id,
  selector: 'all-tasks',
  templateUrl: 'task.component.html'
})
export class TasksComponent {
  allTasks:Task[];
  user:Task[];
  //categoryTasks is static so that it can be accessed and set from tab.component
  static categoryTasks:Tabs[];
  tabs = [];
  title: string;
  category: null;
  userId: null;
  priority: null;
  dueDate: null;
  //this refers to the task service dependancy
  //the params in these functions must be declare as providers in app.module.ts
    constructor(private taskService:TaskService, private userService:UsersService, private tabService:TabService){
      this.user = userService.getUser();
      this.tabs = tabService.getTabs();
      this.taskService.getTasks()
        .subscribe(allTasks => {
            this.allTasks = allTasks;

            //TasksComponent.categoryTasks is the variable with the information held by tab.component
            this.categoryTasks = TasksComponent.categoryTasks;

          });

        }
    addTask(event){
      //console.log(document.getElementsByClassName("active"));
      event.preventDefault();
      this.category = $("#task-category-id").val();
      this.userId = $("#task-user-id").val();
      var newTask = {
        title:this.title,
        isDone: false,
        cat_id:this.category,
        user_id:this.userId,
        priority:this.priority,
        due_date:this.dueDate
      };
      //save task to database
      this.taskService.addTask(newTask)
        .subscribe(task => {
          this.allTasks.push(task);
          this.title = '';
          this.dueDate = '';
          this.priority = '';
        })
    }

    deleteTask(id){
      var allTasks = this.allTasks;

      this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i <allTasks.length;i++){
            if(allTasks[i]._id == id){
              allTasks.splice(i, 1);
            }
          }
        }
      });
    }

    updateStatus(task){
      var _task = {
        _id:task._id,
        title: task.title,
        isDone: !task.isDone
      };

      this.taskService.updateStatus(_task).subscribe( data => {
        task.isDone = !task.isDone;
      })
    }
  }
