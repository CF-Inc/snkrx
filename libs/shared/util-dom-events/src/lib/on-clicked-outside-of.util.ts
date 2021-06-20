import { Observable, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

export const onClickedOutsideOf = (el: HTMLElement | undefined): Observable<Event> =>
  fromEvent(document, 'click').pipe(
    filter((clickEvent) => {
      const clickTarget = clickEvent.target;
      return clickTarget instanceof HTMLElement && el?.contains(clickTarget) !== true;
    }),
  );
