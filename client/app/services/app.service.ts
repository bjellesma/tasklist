import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http'; //to manipulate headers
import 'rxjs/add/operator/map'; //get our requests and then map them

@Injectable()
export class TaskService{
  constructor(private http:Http){
    console.log('Task Service Initialized...');
  }
  //this route is mapped out in routes/tasks.js
  getTasks(){
    //return the tasks page as json
    return this.http.get('http://172.16.21.54:3000/api/tasks')
      .map(res => res.json());
  }

  addTask(newTask){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://172.16.21.54:3000/api/task', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());
  }

  deleteTask(id){
    return this.http.delete('http://172.16.21.54:3000/api/task/'+id)
      .map(res => res.json());
  }

  updateStatus(task){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://172.16.21.54:3000/api/task/'+task._id, JSON.stringify(task), {headers: headers})
      .map(res => res.json());
  }
}

@Injectable()
export class TabService{
  constructor(private http:Http){
    console.log('Tab Service Initialized...');
  }
  //this route is mapped out in routes/tasks.js
  getTabs(){
    //return the tasks page as json
    return this.http.get('http://172.16.21.54:3000/api/tabs')
      .map(res => res.json());
  }
}
