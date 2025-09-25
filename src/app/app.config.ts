import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { headersInterceptor } from './Core/interceptors/headers-interceptor';
import { errorsInterceptor } from './Core/interceptors/errors-interceptor';
import { loudingInterceptor } from './Core/interceptors/louding-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        errorsInterceptor,
        loudingInterceptor,
      ])
    ),
    provideAnimations(),

    importProvidersFrom(CookieService, NgxSpinnerModule),
    provideToastr(),
  ],
};
