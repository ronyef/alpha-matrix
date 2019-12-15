import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Store, Select } from '@ngxs/store'
import { AddProduct } from './../../../actions/product.actions'
import { Product } from '../../../models/product.model'
import { Observable } from 'rxjs'
import { Subscription } from '../../../models/subscription.model'
import { SubscribeToEvent } from '../../../actions/subscription.actions'

@Component({
  selector: 'app-scan-process',
  templateUrl: './scan-process.component.html',
  styleUrls: ['./scan-process.component.css']
})
export class ScanProcessComponent implements OnInit {

  products$: Observable<Product>

  subscription$: Observable<Subscription>

  currentPageSize: number

  constructor(private _electronService: ElectronService, private store: Store) { 

    this.products$ = null

    this.subscription$ = this.store.select(state => state.subscription.subscription)
    this.products$ = this.store.select(state => state.products.products)

  }

  ngOnInit() {
    this.subscription$.subscribe((sub) => {
      if (sub.qrScanned == false) {
        this._electronService.ipcRenderer.on('qr-scanned' , (event , data) => { 
          this.store.dispatch(new AddProduct(data))
        })

        this.store.dispatch(new SubscribeToEvent.ToScan(true))
        console.log('Subscribe to qr-scanned event')
      }
    })
    
  }

}
