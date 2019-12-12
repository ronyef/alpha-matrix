import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { DevicesStoreService } from 'src/app/services/devices-store.service';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {

  private unsubscribe$ = new Subject<void>();

  // devices: [] = null

  // devices: Observable<Device[]>
  // devices: Device[]

  constructor(
    private _electronService: ElectronService,
    // private store: Store<AppState>
    public devicesStoreService: DevicesStoreService
  ) {
    // this.devices = store.select('device')
  }

  detect() {
    // this._electronService.ipcRenderer.send('detect', )
    this._electronService.ipcRenderer.invoke('detect-scanner').then((result) => {
      this.devicesStoreService.detectDevice(result)
    })
  }

  connect(device: string) {
    this._electronService.ipcRenderer.invoke('connect-scanner', device).then((result) => {
      console.log(result)
    })
  }

}
