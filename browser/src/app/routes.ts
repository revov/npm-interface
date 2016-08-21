import { Routes, RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { PackageInfoComponent }    from './package-info/package-info.component';
import { DependenciesComponent }    from './dependencies/dependencies.component';
import { ScriptsComponent }    from './scripts/scripts.component';

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