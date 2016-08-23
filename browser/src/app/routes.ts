import { Routes, RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { PackageInfoComponent }    from './routes/package-info/package-info.component';
import { DependenciesComponent }    from './routes/dependencies/dependencies.component';
import { ScriptsComponent }    from './routes/scripts/scripts.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/package-info',
    pathMatch: 'full'
  },
  { path: 'package-info', component: PackageInfoComponent },
  { path: 'dependencies', component: DependenciesComponent },
  { path: 'scripts', component: ScriptsComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });