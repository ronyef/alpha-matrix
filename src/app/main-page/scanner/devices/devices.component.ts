import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Device } from '../../../models/device.model'
import { AppState } from '../../../app.state'

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
    private store: Store<AppState>
  ) {
    this.devices = store.select('device')
  }

  ngOnInit() {
  }

  detect() {
    // this._electronService.ipcRenderer.send('detect', )
    this._electronService.ipcRenderer.invoke('detect-scanner').then((result) => {
      this.devices = result
    })
  }

}
