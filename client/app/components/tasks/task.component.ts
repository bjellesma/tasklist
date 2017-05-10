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
    sortTable(n, id) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById(id);
      console.log("table: " + table)
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }

  }
