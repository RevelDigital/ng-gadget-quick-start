import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlayerClientModule } from "@reveldigital/player-client";
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
