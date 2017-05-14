import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';
import {getEnvVariables} from '/env.js';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
//if(getEnvVariables().MODE != 'development'){
//  enableProdMode();
//}
