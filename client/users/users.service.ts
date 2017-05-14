import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http'; //to manipulate headers
import 'rxjs/add/operator/map'; //get our requests and then map them
import {getEnvVariables} from '/env.js';

@Injectable()
export class UsersService{
  constructor(private http:Http){
    if(getEnvVariables().MODE == 'development'){
      console.log(getEnvVariables().MODE);
      console.log('Users Service Initialized...');
    }
  }
  //this route is mapped out in routes/tasks.js
  getUsers(){
    //return the tasks page as json
    if(getEnvVariables().MODE == 'openshift'){
      return this.http.get('http://' + getEnvVariables().APIIP + '/users')
        .map(res => res.json());
    }else{
      return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/users')
        .map(res => res.json());
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
      return this.http.post('http://' + getEnvVariables().APIIP + '/api/new-user', JSON.stringify(newUser), {headers: headers})
        .map(res => res.json());
    }else{
      return this.http.post('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/new-user', JSON.stringify(newUser), {headers: headers})
        .map(res => res.json());
      }
  }
}
