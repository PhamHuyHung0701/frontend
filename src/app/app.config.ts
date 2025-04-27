import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const API_URL = 'http://26.81.243.244:8080/api/';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
  
  
};
