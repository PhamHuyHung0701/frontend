import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const API_URL = 'https://6753-14-224-132-5.ngrok-free.app/api/';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
