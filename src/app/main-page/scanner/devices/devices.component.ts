import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Device } from '../../../models/device.model'
import { AppState } from '../../../app.state'
import * as DeviceActions from '../../../actions/device.actions'
import { DevicesStoreService } from 'src/app/services/devices-store.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  // devices: [] = null

  devices: Observable<Device[]>

  constructor(
    private _electronService: ElectronService,
    // private store: Store<AppState>
    public devicesStoreService: DevicesStoreService
  ) {
    // this.devices = store.select('device')
  }

  ngOnInit() {
  }

  detect() {
    // this._electronService.ipcRenderer.send('detect', )
    this._electronService.ipcRenderer.invoke('detect-scanner').then((result) => {
      // this.devices = result
      // this.store.dispatch(new DeviceActions.AddDevice(result))
      this.devicesStoreService.detectDevice(result)
    })
  }

}
