import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { JqueryComponent } from './jquery/jquery.component';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatCardModule
} from '@angular/material';
import { AngularComponent } from './angular/angular.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    JqueryComponent,
    AngularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
