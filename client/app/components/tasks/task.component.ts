import { Component } from '@angular/core';
import {TaskService} from '../../services/app.service';
import {Task} from '../../../Task';

@Component({
  //in order to use the relative path, we need to include the following line
  moduleId: module.id,
  selector: 'all-tasks',
  templateUrl: 'task.component.html'
})
export class TasksComponent {
  allTasks:Task[];
  itTasks:Task[];
  title: string;
  //this refers to the task service dependancy
    constructor(private taskService:TaskService){
      this.taskService.getTasks()
        .subscribe(allTasks => {
          var itTasks = [];
          for(var i = 0; i < allTasks.length; i++){
            if(allTasks[i].category == 'it'){
              itTasks.push(allTasks[i]);
            }
          }
          //this.itTasks refers to the itTasks of this class
          this.itTasks = itTasks;
          this.allTasks = allTasks;
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
          this.allTasks.push(task);
          this.title = '';
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
