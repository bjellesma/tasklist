import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http'; //to manipulate headers
import 'rxjs/add/operator/map'; //get our requests and then map them
import {getEnvVariables} from '/env.js';

@Injectable()
export class TaskService{
  constructor(private http:Http){
    console.log('Task Service Initialized...');
  }
  //this route is mapped out in routes/tasks.js
  getTasks(){
    //return the tasks page as json
    return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tasks')
      .map(res => res.json());
  }

  addTask(newTask){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/task', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());
  }

  deleteTask(id){
    return this.http.delete('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/task/'+id)
      .map(res => res.json());
  }

  updateStatus(task){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/task/'+task._id, JSON.stringify(task), {headers: headers})
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
    return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tabs')
      .map(res => res.json());
  }
  addTab(newTab){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tab', JSON.stringify(newTab), {headers: headers})
      .map(res => res.json());
  }

  deleteTab(id){
    return this.http.delete('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tab/'+id)
      .map(res => res.json());
  }

  updateTab(tab){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tab/'+tab._id, JSON.stringify(tab), {headers: headers})
      .map(res => res.json());
  }
}
