import { Component } from '@angular/core';
import {TasksComponent} from '../tasks/task.component'
import {TabService} from '../../services/app.service';
import {UsersService} from '../../../users/users.service';
import {Tabs} from '../../../Tabs';

@Component({
  moduleId: module.id,
  selector: 'task-tabs',
  templateUrl: 'tab.component.html'
})
export class TabComponent {

  tabs = [];
  user = [];

    constructor(private tabService:TabService, private userService:UsersService){
      this.user = userService.getUser();
      this.tabService.getTabs()
        .subscribe(tabs => {
          this.tabs = tabs;
          //set the category Tasks of the Tasks category
          TasksComponent.categoryTasks = tabs;
        });
    }

  openTab(evt, tabDisplay, tabName){
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("task-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}
