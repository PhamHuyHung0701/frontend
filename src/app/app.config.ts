import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

export const API_URL = 'https://b8de-103-238-68-84.ngrok-free.app/api/';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
