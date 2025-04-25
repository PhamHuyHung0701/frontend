import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const API_URL = 'https://9716-113-185-52-151.ngrok-free.app/api/';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
  
  
};
