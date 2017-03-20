import { Component } from '@angular/core';
//task service is needed because we are connecting to a database

@Component({
  moduleId: module.id,
  selector: 'new-list',
  templateUrl: 'new-list.component.html',
})
export class NewListComponent {
  allTasks:Task[];
  constructor(private listService:ListService){
    this.listService.getLists()
      .subscribe(allLists => {
          this.allLists = allLists;
        });

      }
  addList(event){
    event.preventDefault();
    var newList = {
      display:this.title,
      name: this.title + '-tasks',
    };
    //save list to database
    this.listService.addList(newList)
      .subscribe(list => {
        this.allLists.push(list);
        this.title = '';
      })
  }
}
