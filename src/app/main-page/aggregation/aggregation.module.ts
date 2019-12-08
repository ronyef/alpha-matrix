import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregationRoutingModule } from './aggregation-routing.module';
import { ProductsComponent } from './products/products.component';
import { DevicesComponent } from './devices/devices.component';
import { HelpComponent } from './help/help.component';
import { AggregationComponent } from './aggregation.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [ProductsComponent, DevicesComponent, HelpComponent, AggregationComponent],
  imports: [
    CommonModule,
    ClarityModule,
    AggregationRoutingModule
  ]
})
export class AggregationModule { }
