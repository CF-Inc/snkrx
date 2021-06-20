import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import { ContextMenuDirective } from './context-menu.directive';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [ContextMenuDirective],
  exports: [ContextMenuDirective],
})
export class SharedUtilContextMenuModule {}
