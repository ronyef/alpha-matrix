import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggregationComponent } from './aggregation.component';
import { ProductsComponent } from './products/products.component';
import { DevicesComponent } from './devices/devices.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { 
    path: '', 
    component: AggregationComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'help', component: HelpComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregationRoutingModule { }
