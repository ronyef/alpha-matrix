import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Store, Select, State } from '@ngxs/store'
import { AddAggregation, ClearAggregation } from './../../../actions/aggregation.actions'
import { Aggregation } from '../../../models/aggregation.model'
import { Observable, from } from 'rxjs'
import { Subscription } from '../../../models/subscription.model'
import { SubscribeToEvent } from '../../../actions/subscription.actions'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  aggregations$: Observable<Aggregation>

  subscription$: Observable<Subscription>

  currentPageSize: number

  constructor(private _electronService: ElectronService, private store: Store) { 

    this.aggregations$ = null

    this.subscription$ = this.store.select(state => state.subscription.subscription)
    this.aggregations$ = this.store.select(state => state.aggregations.aggregations)

  }

  ngOnInit() {
    this.subscription$.subscribe((sub) => {
      if (sub.qrAggregated == false) {
        this._electronService.ipcRenderer.on('ag-qr-scanned' , (event , data) => { 
          this.store.dispatch(new AddAggregation(data))
        })

        this.store.dispatch(new SubscribeToEvent.ToAggregate(true))
        console.log('Subscribe to ag-qr-scanned event')
      }
    })
  }

  exportToCSV() {
    let header: string[] = ["nie", "nie_expiry", "batch", "production_date", "expired_date", "serial_no"]
  

    let newArr: Aggregation[] = []
    let productArr: any

    this.aggregations$.subscribe(obj => {
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

    this._electronService.ipcRenderer.invoke('export-aggregation', raw)
      .then(dir => console.log(dir))
  }

  clearProducts() {
    this._electronService.ipcRenderer.invoke('clear-aggregations')
    .then(response => {
      console.log(response)
      if (response == 0) {
        this.store.dispatch(new ClearAggregation())
      }
    })
  }

}
