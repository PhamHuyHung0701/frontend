import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const API_URL = 'https://5707-42-115-134-124.ngrok-free.app/api/';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
  
  
};
