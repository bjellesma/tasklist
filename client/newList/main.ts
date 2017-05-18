import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NewListModule } from './new-list.module';
import {getEnvVariables} from '/env.js';
const platform = platformBrowserDynamic();
platform.bootstrapModule(NewListModule);
