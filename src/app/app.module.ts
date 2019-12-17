import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgxElectronModule } from 'ngx-electron'

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from  './app-routing.module'
import { MainPageModule } from './main-page/main-page.module';
import { from } from 'rxjs';
import { NgxsModule } from '@ngxs/store';
import { DeviceState } from './state/device.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { ProductState } from './state/product.state';
import { SubscriptionState } from './state/subscription.state';
import { RandomCodeState } from './state/random-code.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    BrowserAnimationsModule,
    MainPageModule,
    AppRoutingModule,
    NgxElectronModule,
    NgxsModule.forRoot([
      DeviceState,
      ProductState,
      SubscriptionState,
      RandomCodeState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
