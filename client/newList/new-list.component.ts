import { Component } from '@angular/core';
import {TabService} from '../app/services/app.service';
import {Tabs} from '../../Tabs';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'new-list',
  templateUrl: 'new-list.component.html',
  providers[TabService]
})
export class NewListComponent {
  allTabs:Tabs[];
  constructor(private tabService:TabService){
    this.tabService.getTabs()
      .subscribe(allTabs => {
          this.allTabs = allTabs;
        });

      }
  addList(event){
    event.preventDefault();
    var newList = {
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
}
