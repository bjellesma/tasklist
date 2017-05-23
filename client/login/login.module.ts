//all of the ts that we're loading
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'; //needed to add forms in angular2
import {LoginComponent} from './login.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [LoginComponent],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
