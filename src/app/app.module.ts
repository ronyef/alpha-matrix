import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxElectronModule } from 'ngx-electron'

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from  './app-routing.module'
import { MainPageModule } from './main-page/main-page.module';
import { from } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, deviceReducer } from './reducers';
import { reducer } from './reducers/device.reducer'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    MainPageModule,
    AppRoutingModule,
    NgxElectronModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreModule.forRoot({
      device: deviceReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
