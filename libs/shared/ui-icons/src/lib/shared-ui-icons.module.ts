import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { ICONS } from './icons.constant';

@NgModule({
  imports: [CommonModule, MatIconModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [MatIconRegistry, DomSanitizer],
      useFactory: (registry: MatIconRegistry, sanitizer: DomSanitizer) => {
        for (const [key, path] of Object.entries(ICONS)) {
          const url = sanitizer.bypassSecurityTrustResourceUrl(path);
          registry.addSvgIcon(key, url);
        }

        return () => {};
      },
    },
  ],
  exports: [MatIconModule],
})
export class SharedUiIconsModule {}
