import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {RegisterModule } from './register.module';
import {getEnvVariables} from '/env.js';
const platform = platformBrowserDynamic();
platform.bootstrapModule(RegisterModule);
