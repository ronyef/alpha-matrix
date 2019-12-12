import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { DevicesStoreService } from 'src/app/services/devices-store.service';
import { Observable } from 'rxjs'
import { Store } from '@ngxs/store'
import { DetectDevice, ConnectDevice } from 'src/app/actions/device.actions';
import { Device } from '../../../models/device.model'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {

  devices$: Observable<Device>

  constructor(
    private _electronService: ElectronService,
    private store: Store
  ) {
    this.devices$ = this.store.select(state => state.devices.devices)
  }

  detect() {
    this._electronService.ipcRenderer.invoke('detect-scanner').then((result) => {
      // this.devicesStoreService.detectDevice(result)
      this.store.dispatch(new DetectDevice(result))
    })
  }

  connect(device: string) {
    this._electronService.ipcRenderer.invoke('connect-scanner', device).then((result) => {
      console.log(result)
      if (result == true) {
        this.store.dispatch(new ConnectDevice(device))
      }
    })
  }

}
