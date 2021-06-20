import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZone: 'noop' })
  .then((moduleRef) => {
    if (environment.production) return;

    const applicationRef = moduleRef.injector.get(ApplicationRef);
    for (const componentRef of applicationRef.components) enableDebugTools(componentRef);
  })
  .catch((error) => {
    console.error(error);
  });
