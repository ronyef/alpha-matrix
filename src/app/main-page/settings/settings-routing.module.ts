import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { PrinterComponent } from './printer/printer.component';
import { UvComponent } from './uv/uv.component';
import { ScannerComponent } from './scanner/scanner.component';
import { RejectorComponent } from './rejector/rejector.component';
import { AggregationComponent } from './aggregation/aggregation.component';
import { CloudComponent } from './cloud/cloud.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { 
    path: '', 
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'printer', pathMatch: 'full' },
      { path: 'printer', component: PrinterComponent },
      { path: 'uv', component: UvComponent },
      { path: 'scanner', component: ScannerComponent },
      { path: 'rejector', component: RejectorComponent },
      { path: 'aggregation', component: AggregationComponent },
      { path: 'cloud', component: CloudComponent },
      { path: 'help', component: HelpComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
