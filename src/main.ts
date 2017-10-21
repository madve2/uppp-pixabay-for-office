import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var Office;

function bootstrap() {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
}

if (environment.production) {
  Office.initialize = function () {
    bootstrap();
  };
} else {
  bootstrap();
}