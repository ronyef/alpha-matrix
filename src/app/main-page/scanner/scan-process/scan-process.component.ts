import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Store, Select, State } from '@ngxs/store'
import { AddProduct, ClearProduct } from './../../../actions/product.actions'
import { Product } from '../../../models/product.model'
import { Observable, from } from 'rxjs'
import { Subscription } from '../../../models/subscription.model'
import { SubscribeToEvent } from '../../../actions/subscription.actions'
import { Reject } from '../../../models/reject.model'
import { ResetReject, AddReject } from 'src/app/actions/rejector.actions';


@Component({
  selector: 'app-scan-process',
  templateUrl: './scan-process.component.html',
  styleUrls: ['./scan-process.component.css']
})
export class ScanProcessComponent implements OnInit {

  products$: Observable<Product>

  subscription$: Observable<Subscription>

  reject$: Observable<Reject>
  reject: Reject

  currentPageSize: number

  constructor(private _electronService: ElectronService, private store: Store) { 

    this.products$ = null

    this.subscription$ = this.store.select(state => state.subscription.subscription)
    this.products$ = this.store.select(state => state.products.products)
    this.reject$ = this.store.select(state => state.reject.reject)

  }

  ngOnInit() {
    
    this.subscription$.subscribe((sub) => {
      if (sub.qrScanned == false) {
        this._electronService.ipcRenderer.on('qr-scanned' , (event , data) => { 
          this.store.dispatch(new AddProduct(data))
        })

        this.store.dispatch(new SubscribeToEvent.ToScan(true))
      }

      if (sub.rejector == false) {
        this._electronService.ipcRenderer.on('reject', (event, data) => {
          this.store.dispatch(new AddReject())
        })

        this.store.dispatch(new SubscribeToEvent.ToRejector(true))
      }
    })

    this.reject$.subscribe((rej) => {
      this.reject = rej
    })
    
  }

  exportToCSV() {
    let header: string[] = ["nie", "nie_expiry", "batch", "production_date", "expired_date", "serial_no"]
  

    let newArr: Product[] = []
    let productArr: any

    this.products$.subscribe(obj => {
      newArr.push(obj)
      productArr = newArr[0]
    })

    let raw: any[] = []

    productArr.forEach(prod => {
      let temp: string[] = []
      temp.push(prod.nie)
      temp.push(prod.nieExpiry)
      temp.push(prod.batch)
      temp.push(prod.productionDate)
      temp.push(prod.expiryDate)
      temp.push(prod.serialNo)
      raw.push(temp)
    });

    raw.unshift(header)
    console.log(raw)

    this._electronService.ipcRenderer.invoke('export-scan', raw)
      .then(dir => console.log(dir))
  }

  clearProducts() {
    this._electronService.ipcRenderer.invoke('clear-products')
    .then(response => {
      console.log(response)
      if (response == 0) {
        this.store.dispatch(new ClearProduct())
        this.store.dispatch(new ResetReject())
      }
    })
  }

}
