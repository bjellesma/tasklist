import { Component } from '@angular/core';
import {TabComponent} from '../tabs/tab.component'
import {TaskService, TabService} from '../../services/app.service';
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
  categoryTasks:Tabs[];
  title: string;
  //this refers to the task service dependancy
  //the params in these functions must be declare as providers in app.module.ts
    constructor(public tabComponent: TabComponent, private taskService:TaskService){
      this.taskService.getTasks()
        .subscribe(allTasks => {
          this.categoryTasks = tabComponent.tabs;
          //console.log("");
            this.allTasks = allTasks;
            /*for(var i = 0; i < this.allTasks.length; i++){
              for(var j = 0; j < categories.length; j++){
                if(this.allTasks[i].category == categories[j][0]){
                  console.log(this.allTasks[i].title + " is part of " + categories[j][0]);
                  categories[j][]
                }
              }
            }*/
          });

        }
    addTask(event){
      event.preventDefault();
      var newTask = {
        title:this.title,
        isDone: false
      };
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
