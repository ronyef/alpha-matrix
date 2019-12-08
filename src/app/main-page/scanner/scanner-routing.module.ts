import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScannerComponent } from './scanner.component';
import { ScanProcessComponent } from './scan-process/scan-process.component';
import { DevicesComponent } from './devices/devices.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { 
    path: '', 
    component: ScannerComponent,
    children: [
      { path: '', redirectTo: 'process', pathMatch: 'full'},
      { path: 'process', component: ScanProcessComponent },
      { path: 'devices', component: DevicesComponent },
      { path: 'help', component: HelpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerRoutingModule { }
