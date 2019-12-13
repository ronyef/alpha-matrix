import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Store } from '@ngxs/store'
import { AddProduct } from './../../../actions/product.actions'
import { Product } from '../../../models/product.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-scan-process',
  templateUrl: './scan-process.component.html',
  styleUrls: ['./scan-process.component.css']
})
export class ScanProcessComponent implements OnInit {

  products$: Observable<Product>

  constructor(private _electronService: ElectronService, private store: Store) { 
    this.products$ = this.store.select(state => state.products.products)
  }

  ngOnInit() {
    this._electronService.ipcRenderer.on('qr-scanned' , (event , data) => { 
      
      this.storeProduct(data)
      // let productData: Product = {
      //   nie: data.nie,
      //   nieExpiry: data.nieExpiry,
      //   batch: data.batch,
      //   productionDate: data.productionDate,
      //   expiryDate: data.expiryDate,
      //   serialNo: data.serialNo
      // }
  
      // console.log(productData)
    })
  }

  storeProduct = (data: Product) => {
    this.store.dispatch(new AddProduct(data))
  }
}
