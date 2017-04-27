import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProfileModule } from './profile.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(ProfileModule);
