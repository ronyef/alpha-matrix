import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { ElectronService } from 'ngx-electron'
import { RandomCode } from '../../../models/random-code.model'
import { Store } from '@ngxs/store'
import { AddRandomCode, ClearRandomCode } from '../../../actions/random-code.actions'
import { Observable } from 'rxjs';

const uuid = require('uuid-random')

@Component({
  selector: 'app-serialization',
  templateUrl: './serialization.component.html',
  styleUrls: ['./serialization.component.css']
})
export class SerializationComponent implements OnInit {

  serials$: Observable<RandomCode>

  constructor(private store: Store, private electronService: ElectronService) { 
    this.serials$ = this.store.select(state => state.randomCodes.randomCodes)
  }

  ngOnInit() {
  }

  codeForm = new FormGroup({
      num: new FormControl('', Validators.required),
  });

  resetForm() {
    this.codeForm.reset()
    this.store.dispatch(new ClearRandomCode)
  }

  generateSerials() {
    const num = this.codeForm.get('num').value
    const serials: RandomCode[] = []

    for (let i = num; i > 0; i --) {
      serials.push(uuid())
    }

    this.store.dispatch(new AddRandomCode(serials))
    console.log(serials)
  }

  submit() {
    if (this.codeForm.invalid) {
      this.codeForm.markAsTouched
    } else {
      let dataArr: any[] = []
      this.serials$.subscribe(obj => {
        let tempArr: any[] = []
        // console.log(obj[3])
        tempArr.push(obj)
        // console.log(tempArr)
        dataArr.push(tempArr[0])
      })
      console.log(dataArr)
      this.electronService.ipcRenderer.invoke('export-serials', dataArr)
    }
    
  }

}
