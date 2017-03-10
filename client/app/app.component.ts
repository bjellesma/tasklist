import { Component } from '@angular/core';
//task service is needed because we are connecting to a database
import { TaskService, TabService} from './services/app.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers[TaskService, TabService]
})
export class AppComponent { }
