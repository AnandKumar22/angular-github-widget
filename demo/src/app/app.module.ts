import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgGithubCardModule} from 'ng-github-card';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgGithubCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
