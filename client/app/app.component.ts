import { Component } from '@angular/core';
//task service is needed because we are connecting to a database
import { TaskService} from './services/task.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers[TaskService]
})
export class AppComponent { }
