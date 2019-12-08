import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page.component'
import { PrinterModule } from './printer/printer.module';
import { ScannerModule } from './scanner/scanner.module';
import { AggregationModule } from './aggregation/aggregation.module';
import { SettingsModule } from './settings/settings.module';

const routes: Routes = [
    {
        path: 'main',
        component: MainPageComponent,
        children: [
            { path: '', redirectTo: 'scanner', pathMatch: 'full'},
            { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerModule' },
            { 
                path: 'printer', 
                loadChildren: './printer/printer.module#PrinterModule'
            },
            { path: 'aggregation', loadChildren: './aggregation/aggregation.module#AggregationModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' }
        ]
    }
        
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {}