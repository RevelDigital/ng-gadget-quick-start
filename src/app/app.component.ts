import {Component, ElementRef, HostBinding, ViewChild} from '@angular/core';
import packageJson from '../../package.json';
import {PlayerClientService} from "@reveldigital/player-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('container', {static:false, read: ElementRef }) container: ElementRef;


  @HostBinding('style.width.px')
  width: number = 500;
  @HostBinding('style.height.px')
  height: number = 800;
  prefs: any;

  public version: string = packageJson.version;
  title = 'GadgetHarness'+`_${this.version}`;
  constructor(public player: PlayerClientService) {
    if (typeof gadgets !== 'undefined') {
      this.prefs = new gadgets.Prefs();
      console.log(this.prefs, 'test')
    }
    console.log(this.version)
    this.player.onCommand$.subscribe((command=>{
      console.log(command)
    }))

  }
}
