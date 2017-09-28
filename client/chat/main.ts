import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {ChatModule } from './chat.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(ChatModule);
