import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {LoginModule } from './login.module';
import {getEnvVariables} from '/env.js';
const platform = platformBrowserDynamic();
platform.bootstrapModule(LoginModule);
