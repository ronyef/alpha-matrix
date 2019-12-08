import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page.component';
import { SettingsComponent } from './settings/settings.component';
import { PrinterModule } from './printer/printer.module';
import { ScannerModule } from './scanner/scanner.module';
import { AggregationModule } from './aggregation/aggregation.module';
import { SettingsModule } from './settings/settings.module';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    ScannerModule,
    PrinterModule,
    AggregationModule,
    SettingsModule,
    MainRoutingModule,
  ]
})
export class MainPageModule { }
