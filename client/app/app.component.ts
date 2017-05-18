import { Component } from '@angular/core';
//task service is needed because we are connecting to a database
import { TaskService, TabService, UsersService} from './services/app.service';
import {TabComponent} from './components/tabs/tab.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers[TabService, TaskService, UsersService]
})
export class AppComponent { }
