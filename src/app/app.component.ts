import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { PlayerClientService } from "@reveldigital/player-client";
import packageJson from '../../package.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('container', { static: false }) container: ElementRef;

  @HostBinding('style.width.px')
  width: number = 500;
  @HostBinding('style.height.px')
  height: number = 800;

  title = `${packageJson.name} v${packageJson.version}`;
  prefs: any;

  constructor(public player: PlayerClientService) {
    console.log('Loaded: ', this.title)

    if (typeof gadgets !== 'undefined') {
      this.prefs = new gadgets.Prefs();
    }
  }
}
