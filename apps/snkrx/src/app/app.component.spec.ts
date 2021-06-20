import { Spectator, createRoutingFactory } from '@ngneat/spectator';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createRoutingFactory({
    component: AppComponent,
    stubsEnabled: false,
    routes: [],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should be created without error', () => {
    expect(spectator.component).not.toBeUndefined();
  });
});
