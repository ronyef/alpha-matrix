import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { PrinterComponent } from './printer/printer.component';
import { UvComponent } from './uv/uv.component';
import { ScannerComponent } from './scanner/scanner.component';
import { RejectorComponent } from './rejector/rejector.component';
import { AggregationComponent } from './aggregation/aggregation.component';
import { CloudComponent } from './cloud/cloud.component';
import { HelpComponent } from './help/help.component';
import { SettingsComponent } from './settings.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [PrinterComponent, UvComponent, ScannerComponent, RejectorComponent, AggregationComponent, CloudComponent, HelpComponent, SettingsComponent],
  imports: [
    CommonModule,
    ClarityModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
