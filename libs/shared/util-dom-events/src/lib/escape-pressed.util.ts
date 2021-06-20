import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

export const ESCAPE_PRESSED$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  filter(({ key }) => key === 'Escape'),
);
