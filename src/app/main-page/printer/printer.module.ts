import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { PrinterRoutingModule } from './printer-routing.module';
import { PrinterComponent } from './printer.component';
import { SerializationComponent } from './serialization/serialization.component';
import { CodeGenerationComponent } from './code-generation/code-generation.component';
import { PrinterHelpComponent } from './printer-help/printer-help.component';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [PrinterComponent, SerializationComponent, CodeGenerationComponent, PrinterHelpComponent],
  imports: [
    CommonModule,
    ClarityModule,
    PrinterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PrinterModule { }
