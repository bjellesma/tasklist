import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http'; //to manipulate headers
import 'rxjs/add/operator/map'; //get our requests and then map them
import {getEnvVariables} from '/env.js';
//for sessions
var session = require('client-sessions');

@Injectable()
export class UsersService{
  constructor(private http:Http){
    console.log('Users Service Initialized...');
  }
  //this route is mapped out in routes/tasks.js
  getUsers(){
    //return the tasks page as json
    return this.http.get('http://' + getEnvVariables().APIIP + ':' + getEnvVariables().APIPORT + '/api/users')
      .map(res => res.json());
  }
  getUser(){
    var user = session.user;
    return user;
  }
}
