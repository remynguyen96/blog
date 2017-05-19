import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/guard/auth.guard";
import { DeactiveAuthGuard } from "./auth/guard/deactiveAuth.guard";
////////////////////
import { NotFoundComponent } from "./not-found/not-found.component";
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';

const routes : Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        canLoad: [AuthGuard], // not working
        canDeactivate: [DeactiveAuthGuard],
        children:[
          {
              path: 'user',
              loadChildren: 'app/user/user.module#UserModule',
              canLoad: [AuthGuard],
              canDeactivate: [DeactiveAuthGuard],
          },
          {
              path: 'settings',
              loadChildren : 'app/settings/settings.module#SettingsModule',
              canLoad: [AuthGuard],
              canDeactivate: [DeactiveAuthGuard],
          },
          {
              path: 'blogs',
              loadChildren : 'app/blog/blog.module#BlogModule',
              canLoad: [AuthGuard],
              canDeactivate: [DeactiveAuthGuard],
          },
          {
              path: 'categories',
              loadChildren : 'app/categories/categories.module#CategoriesModule',
              canLoad: [AuthGuard],
              canDeactivate: [DeactiveAuthGuard],
          },
          {
              path: 'menu',
              loadChildren : 'app/menu/menu.module#MenuModule',
              canLoad: [AuthGuard],
              canDeactivate: [DeactiveAuthGuard],
          },
          {
              path: 'events',
              component: EventsComponent,
              canLoad: [AuthGuard], // not working
              canDeactivate: [DeactiveAuthGuard],
          },
          {
              path: 'pages',
              component: PagesComponent,
              canLoad: [AuthGuard], // not working
              canDeactivate: [DeactiveAuthGuard],
          },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
