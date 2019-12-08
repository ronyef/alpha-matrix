import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScanProcessComponent } from './scan-process/scan-process.component';
import { DevicesComponent } from './devices/devices.component';
import { HelpComponent } from './help/help.component';
import { ClarityModule } from '@clr/angular';
import { ScannerComponent } from './scanner.component';


@NgModule({
  declarations: [
    ScannerComponent,
    ScanProcessComponent, 
    DevicesComponent, 
    HelpComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ScannerRoutingModule
  ]
})
export class ScannerModule { }
