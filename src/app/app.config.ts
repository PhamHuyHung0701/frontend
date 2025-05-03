import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const API_URL = 'https://3e76-2402-800-6112-a093-464-8787-b58e-a13d.ngrok-free.app/api/';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],


};
