import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({
        anchorScrolling: 'disabled',
        scrollPositionRestoration: 'disabled',
      }), withRouterConfig({
      onSameUrlNavigation: 'reload'
    })),
    providePrimeNG({
      theme: {
        preset: Lara
      }
    })
  ]
};
