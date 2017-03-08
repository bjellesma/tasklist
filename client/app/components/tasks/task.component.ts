import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';

@Component({
  //in order to use the relative path, we need to include the following line
  moduleId: module.id,
  selector: 'all-tasks',
  templateUrl: 'task.component.html'
})
export class TasksComponent {
  tasks:Task[];
  title: string;
  //this refers to the task service dependancy
    constructor(private taskService:TaskService){
      this.taskService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks;
        });
    }

    addTask(event){
      event.preventDefault();
      var newTask = {
        title:this.title,
        isDone: false
      }
      //save task to database
      this.taskService.addTask(newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.title = '';
        })
    }

    deleteTask(id){
      var tasks = this.tasks;

      this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i <tasks.length;i++){
            if(tasks[i]._id == id){
              tasks.splice(i, 1);
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
