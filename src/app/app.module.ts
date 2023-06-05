import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { PlayerClientModule } from "@reveldigital/player-client";
import { APP_BASE_HREF } from '@angular/common';

// declare global {
//   interface Window { MyNamespace: any; }
// }
// export function initializeApp(appInitService: AppInitService) {
//   return (): Promise<any> => {
//     return appInitService.init();
//   };
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PlayerClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: () => {
        try {
          return new gadgets.Prefs().getLang();
        } catch {
          return 'en';
        }
      }
    },
    {
      provide: APP_BASE_HREF, useValue: '/gadgets/ifr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
