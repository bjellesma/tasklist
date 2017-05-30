//all of the ts that we're loading
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'; //needed to add forms in angular2
import { AppComponent} from './app.component';
import { TabComponent} from './components/tabs/tab.component';
import {TasksComponent} from './components/tasks/task.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [AppComponent, TasksComponent, TabComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
