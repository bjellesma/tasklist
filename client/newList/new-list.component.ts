import { Component } from '@angular/core';
import {TabService} from '../app/services/app.service';
import {UsersService} from '../../../users/users.service';
import {Tabs} from '../../Tabs';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'new-list',
  templateUrl: 'new-list.component.html',
  providers[TabService, UsersService]
})
export class NewListComponent {
  allTabs:Tabs[];
  user = [];
  constructor(private tabService:TabService, private userService:UsersService){
    this.user = userService.getUser();
    this.tabService.getTabs()
      .subscribe(allTabs => {
          this.allTabs = allTabs;
        });

      }
  addList(event){
    event.preventDefault();
    var newList = {
      user_id:this.user._id,
      display:this.title,
      name: this.title + '-tasks',
    };
    //save list to database
    this.tabService.addTab(newList)
      .subscribe(list => {
        this.allTabs.push(newList);
        this.title = '';
      })
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
  shareList(list){
    //use alert to get user_id
    var user_id = "fred";
    this.tabService.updateTab(list, {share: [user_id]}).subscribe(data => {
      alert("This list has been shared with " + user_id);
    });
  }
}
