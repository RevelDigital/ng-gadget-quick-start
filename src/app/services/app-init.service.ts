import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as ymal from "js-yaml";
import yaml from "js-yaml";
import pjson from "../../../package.json";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  timestamp: any = new Date().getTime();

  constructor(public http:HttpClient, private _route: ActivatedRoute, private _router: Router) {
    let lastUptime = localStorage.getItem('uptime') || '30';
    console.log('Last uptime was', lastUptime, 'seconds');
  }

  init(): Promise<any> {
    return new Promise<void>(async (resolve) => {
      this.http.get('assets/user-prefs.yml', {responseType: 'text'}).subscribe(data => {
        try {
          const doc:any = yaml.load(data);
          console.log(doc.prefs)
          let params:any = {}
          for(const val of doc.prefs){
            params[val.name] = val.default_value
          }
          console.log(params)
          this.navigateToFoo(params)
        } catch (e) {
          console.log(e);
        }
        resolve();
      })

    });
  }

  navigateToFoo(params:any){
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: params,
    });
  }

}
