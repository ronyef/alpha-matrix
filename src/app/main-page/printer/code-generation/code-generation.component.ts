import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { ElectronService } from 'ngx-electron'
const uuid = require('uuid-random')

@Component({
  selector: 'app-code-generation',
  templateUrl: './code-generation.component.html',
  styleUrls: ['./code-generation.component.css']
})
export class CodeGenerationComponent implements OnInit {

  codeForm = new FormGroup({
      nie: new FormControl('', Validators.required),
      nie_expired_date: new FormControl('', Validators.required),
      batch: new FormControl('', Validators.required),
      prod_date: new FormControl('', Validators.required),
      exp_date: new FormControl('', Validators.required),
      prod_num: new FormControl('', Validators.required),
  });

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  submit() {

    let codes: any[] = []
    let code: string[] = []
    let header: string[] = ["nie", "nie_expiry", "batch", "production_date", "expired_date", "serial_no"]

    for (let i = 0; i < this.codeForm.get('prod_num').value * 1; i++) {
      code = []

      code.push('(90)' + this.codeForm.get('nie').value)
      code.push('(91)' + this.formatDate(this.codeForm.get('nie_expired_date').value))
      code.push('(10)' + this.codeForm.get('batch').value)
      code.push('(11)' + this.formatDate(this.codeForm.get('prod_date').value))
      code.push('(17)' + this.formatDate(this.codeForm.get('exp_date').value))
      code.push('(21)' + uuid())
      codes.push(code)
    }

    // codes.unshift(header)

    this.electronService.ipcRenderer.invoke('export-full-code', codes)
    .then(res => console.log(res))

  }

  formatDate(rawDate: string): string {
    let splittedDate = rawDate.split('/')
    return splittedDate[2] + splittedDate[1] + splittedDate[0]
  }

  resetForm() {
    this.codeForm.reset()
  }

}
