import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { ESCAPE_PRESSED$, onClickedOutsideOf } from '@cf/shared/util-dom-events';

import { Subject, merge } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[contextMenu]',
})
export class ContextMenuDirective<T = unknown> implements OnDestroy {
  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  @Input('contextMenu')
  public contextTemplate?: TemplateRef<unknown>;

  @Input('contextMenuData')
  public data?: T;

  private readonly contextMenuDestroyed$ = new Subject();
  private overlayRef?: OverlayRef;

  @HostListener('contextmenu', ['$event'])
  public open(event: MouseEvent): void {
    event.preventDefault();
    this.close();
    if (this.contextTemplate === undefined) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(event)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef
      .attach(
        new TemplatePortal(this.contextTemplate, this.viewContainerRef, {
          $implicit: this.data,
          close: this.close.bind(this),
        }),
      )
      .markForCheck();

    positionStrategy.apply();
    void this.listenForCloseEvent(this.overlayRef);
  }

  private async listenForCloseEvent(overlayRef: OverlayRef): Promise<void> {
    await merge(onClickedOutsideOf(overlayRef.overlayElement), ESCAPE_PRESSED$)
      .pipe(
        filter(() => this.overlayRef !== undefined),
        take(1),
        takeUntil(this.contextMenuDestroyed$),
      )
      .toPromise()
      .then(() => {
        this.close();
      });
  }

  public close(): void {
    this.contextMenuDestroyed$.next();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  public ngOnDestroy(): void {
    this.close();
  }
}
