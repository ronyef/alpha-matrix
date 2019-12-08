import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterComponent } from './printer.component';
import { SerializationComponent } from './serialization/serialization.component';
import { CodeGenerationComponent } from './code-generation/code-generation.component';
import { PrinterHelpComponent } from './printer-help/printer-help.component';


const routes: Routes = [
  { 
    path: '', 
    component: PrinterComponent,
    children: [
      { path: '', redirectTo: 'serialization', pathMatch: 'full'},
      { path: 'serialization', component: SerializationComponent },
      { path: 'codegen', component: CodeGenerationComponent },
      { path: 'help', component: PrinterHelpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrinterRoutingModule { }
