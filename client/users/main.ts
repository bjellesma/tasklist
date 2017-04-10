import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UsersModule } from './users.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(UsersModule);
