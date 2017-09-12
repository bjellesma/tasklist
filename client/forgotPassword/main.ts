import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {forgotPasswordModule } from './forgotPassword.module';
import {getEnvVariables} from '/env.js';
const platform = platformBrowserDynamic();
platform.bootstrapModule(forgotPasswordModule);
