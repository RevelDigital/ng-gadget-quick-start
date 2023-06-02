import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import yaml from "js-yaml";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  timestamp: any = new Date().getTime();

  constructor(public http: HttpClient, private _route: ActivatedRoute, private _router: Router) {
    let lastUptime = localStorage.getItem('uptime') || '30';
    console.log('Last uptime was', lastUptime, 'seconds');
  }

  init(): Promise<any> {
    return new Promise<void>(async (resolve) => {
      if (environment.production) resolve()
      else {
        console.log('dev env')
        this.http.get('assets/user-prefs.yml', { responseType: 'text' }).subscribe(data => {
          try {
            const doc: any = yaml.load(data);
            let params: any = {}
            for (const val of doc.prefs) {
              params[val.name] = val.default_value
            }
            this.navigateToFoo(params)
          } catch (e) {
            console.log(e);
          }
          resolve();
        })
      }
    });
  }

  navigateToFoo(params: any) {
    (<any>window).gadgets =

    {

      Prefs: class {
        getString(key: string) { return this.getParameterByName(key) }

        getArray(key: string) { return this.getParameterByName(key).split(',') }

        getBool(key: string) { return this.getParameterByName(key) === 'true' }

        getCountry() { }

        getFloat(key: string) { return parseFloat(this.getParameterByName(key)) }

        getInt(key: string) { return parseInt(this.getParameterByName(key)) }

        getLang() { }

        getParameterByName(name: string, url = window.location.href): string {
          name = name.replace(/[\[\]]/g, '\\$&');
          let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
          if (!results) return '';
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
      }

    }
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: params,
    });
  }
}
