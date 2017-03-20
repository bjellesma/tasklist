import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NewListModule } from './new-list.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(NewListModule);
