import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { RX_ANGULAR_CONFIG } from '@rx-angular/cdk';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NxModule.forRoot(),
    StoreModule.forRoot({}, environment.storeConfig),
    EffectsModule.forRoot([]),
    ...environment.rootModules,
  ],
  providers: [
    {
      provide: RX_ANGULAR_CONFIG,
      useValue: {
        primaryStrategy: 'local',
        patchZone: true,
      },
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
