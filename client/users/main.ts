import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UsersModule } from './users.module';
import {enableProdMode} from '@angular/core';
import {getEnvVariables} from '/env.js';
const platform = platformBrowserDynamic();
platform.bootstrapModule(UsersModule);
