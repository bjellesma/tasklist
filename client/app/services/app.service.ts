import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http'; //to manipulate headers
import 'rxjs/add/operator/map'; //get our requests and then map them
import {getEnvVariables} from '/env.js';


@Injectable()
export class TaskService{
  constructor(private http:Http){
    if(getEnvVariables().MODE == 'development'){
      console.log('Task Service Initialized...');
    }
  }
  //this route is mapped out in routes/tasks.js
  getTasks(){
    //return the tasks page as json
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.get('http://' + getEnvVariables().APIIP + '/api/tasks')
        .map(res => res.json());
    }else{
      return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tasks')
        .map(res => res.json());
    }
  }

  addTask(newTask){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.post('http://' + getEnvVariables().APIIP + '/api/task', JSON.stringify(newTask), {headers: headers})
        .map(res => res.json());
    }else{
      return this.http.post('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/task', JSON.stringify(newTask), {headers: headers})
        .map(res => res.json());
      }
  }

  deleteTask(id){
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.delete('http://' + getEnvVariables().APIIP + '/api/task/'+id)
        .map(res => res.json());
    }else{
      return this.http.delete('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/task/'+id)
        .map(res => res.json());
      }
  }

  updateStatus(task){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.put('http://' + getEnvVariables().APIIP + '/api/task/'+task._id, JSON.stringify(task), {headers: headers})
        .map(res => res.json());
    }else{
      return this.http.put('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/task/'+task._id, JSON.stringify(task), {headers: headers})
        .map(res => res.json());
      }
  }
}

@Injectable()
export class TabService{
  constructor(private http:Http){
    if(getEnvVariables().MODE == 'development'){
      console.log('Tab Service Initialized...');
    }
  }
  getTab(id){
    //return the tasks page as json
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.get('http://' + getEnvVariables().APIIP + '/api/tab/'+id)
        .map(res => res.json());
    }else{
      return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tab'+id)
        .map(res => res.json());
      }
  }
  //this route is mapped out in routes/tasks.js
  getTabs(){
    //return the tasks page as json
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.get('http://' + getEnvVariables().APIIP + '/api/tabs')
        .map(res => res.json());
    }else{
      return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tabs')
        .map(res => res.json());
      }
  }
  addTab(newTab){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.post('http://' + getEnvVariables().APIIP + '/api/new-list', JSON.stringify(newTab), {headers: headers})
        .map(res => res.json());
    }else{
      return this.http.post('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/new-list', JSON.stringify(newTab), {headers: headers})
        .map(res => res.json());
      }
  }

  deleteTab(id){
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.delete('http://' + getEnvVariables().APIIP + '/api/tab/'+id)
        .map(res => res.json());
    }else{
      return this.http.delete('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tab/'+id)
        .map(res => res.json());
      }
  }

  updateTab(tab, updateInfo){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.put('http://' + getEnvVariables().APIIP + '/api/tab/'+tab._id, JSON.stringify({tab: tab, updateInfo: updateInfo}), {headers: headers})
        .map(res => res.json());
    }else{
      return this.http.put('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/tab/'+tab._id, JSON.stringify({tab: tab, updateInfo: updateInfo}), {headers: headers})
        .map(res => res.json());
      }
  }
}

@Injectable()
export class UsersService{
  APIIP = getEnvVariables().APIIP;
  APIPORT = getEnvVariables().APIPORT;
  MODE = getEnvVariables().MODE;
  constructor(private http:Http){

    if(getEnvVariables().MODE == 'development'){
      console.log('Users Service Initialized...');
    }
  }
  login(login){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if(this.MODE == 'openshift'){
      return this.http.post('http://' + this.APIIP + '/login', JSON.stringify(login), {headers: headers})
        .map(res => res.json());
    }else{

      return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/login', JSON.stringify(login), {headers: headers})
        .map(res => res.json());
      }
  }
  //this route is mapped out in routes/tasks.js
  getUsers(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return the tasks page as json
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.get('http://' + this.APIIP + '/api/users')
        .map(res => res.json());
    }else{
      return this.http.get('http://' + this.APIIP + ':' + this.APIPORT + '/api/users')
        .map(res => {
          console.log("res: " + res);
          res.json()
        });
      }
  }
  getUser(){
    var user = getEnvVariables().user;
    return user;
  }
  addUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.post('http://' + this.APIIP + '/api/new-user', JSON.stringify(newUser), {headers: headers})
        .map(res => res.json());
    }else{
      return this.http.post('http://' + this.APIIP + ':' + this.APIPORT + '/api/new-user', JSON.stringify(newUser), {headers: headers})
        .map(res => res.json());
      }
  }
}
