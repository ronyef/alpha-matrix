import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Observable } from 'rxjs'
import { Store } from '@ngxs/store'
import { DetectDevice, ConnectDevice } from 'src/app/actions/device.actions';
import { Device } from '../../../models/device.model'

@Component({
  selector: 'app-rejector',
  templateUrl: './rejector.component.html',
  styleUrls: ['./rejector.component.css']
})
export class RejectorComponent implements OnInit {

  devices$: Observable<Device>

  constructor(
    private _electronService: ElectronService,
    private store: Store
  ) {
    this.devices$ = this.store.select(state => state.devices.devices)
  }

  ngOnInit() {}

  detect() {
    this._electronService.ipcRenderer.invoke('detect-scanner').then((result) => {
      // this.devicesStoreService.detectDevice(result)
      this.store.dispatch(new DetectDevice(result))
    })
  }

  connect(device: string) {
    this._electronService.ipcRenderer.invoke('connect-rejector', device).then((result) => {
      console.log(result)
      if (result == true) {
        this.store.dispatch(new ConnectDevice(device))
      }
    })
  }

}
