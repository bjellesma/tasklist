//all of the ts that we're loading
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'; //needed to add forms in angular2
import { ProfileComponent} from './profile.component';
@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ProfileComponent],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
