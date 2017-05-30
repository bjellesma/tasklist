import { Component } from '@angular/core';
import {TasksComponent} from '../tasks/task.component'
import {TabService, UsersService} from '../../services/app.service';
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

    createTab(event){
      $(".task-tab-content").css("display", "none");
      $("#task-entry").css("display", "none");
      $("#tabCreation").css("display", "block");
    }
    addTab(event){
      event.preventDefault();
      var newList = {
        user_id:this.user._id,
        display:this.title,
        name: this.title + '-tasks',
      };
      //save list to database
      this.tabService.addTab(newList)
        .subscribe(list => {
          this.tabs.push(newList);
          this.title = '';
        })
      window.location.reload();
    }
    deleteList(id){
      var allTabs = this.allTabs;

      this.tabService.deleteTab(id).subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i <allTabs.length;i++){
            if(allTabs[i]._id == id){
              allTabs.splice(i, 1);
            }
          }
        }
      });
    }
    chooseShare(list){
      var shareList = "<select size='20'>";
      var n = 0;
      var curTab = list._id;
      var tabService = this.tabService;
      var users = this.allUsers;
      //TODO get tab from db based on id
      //TODO get shares from tab
      //TODO if any options are equal to what is here, we won't include when we grab the list of users
      for(n=0;n<users.length;n++){
        shareList += "<option value='" + users[n]._id + "'>" + users[n].name + "</option>";
      }
      shareList += "</select>";
      $("#shareList").html(shareList + "<button id='shareListButton'>Share</button>");

      $("#shareListButton").click(function(){
        var user_id = $("#shareList").find(":selected").val();
        var userName = $("#shareList").find(":selected").text();
        tabService.updateTab(list, {share: [user_id]}).subscribe(data => {
          alert("This list has been shared with " + userName);
        });
      });
    }
  openTab(evt, tabDisplay, tabName, cat_id, user_id){
    //display task entry form again if it was disabled
    $("#task-entry").css("display", "block");
    $(".task-tab-content").css("display", "block");
    //hide tab creation if it was enabled
    $("#tabCreation").css("display", "none");
    // Declare all variables
    var i, tabcontent, tablinks;
    if($("#all-tasks-table").css("display", "block")){
      $("#all-tasks-table").css("display", "none")
    }
    $("#task-category-id").val(cat_id);
    $("#task-user-id").val(user_id);
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
