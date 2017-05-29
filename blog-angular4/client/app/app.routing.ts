import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthGuard } from "./auth/guard/auth.guard";
import { DeactiveAuthGuard } from "./auth/guard/deactiveAuth.guard";
////////////////////
import { NotFoundComponent } from "./not-found/not-found.component";
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
              data: {
                animation: {
                  value : 'category'
                }
              },
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
              data: {
                animation: {
                  value : 'events'
                }
              },
          },
          {
              path: 'pages',
              loadChildren : 'app/pages/pages.module#PagesModule',
              canLoad: [AuthGuard],
              canDeactivate: [DeactiveAuthGuard],
              data: {
                animation: {
                  value : 'pages'
                }
              },
          },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ preloadingStrategy : PreloadAllModules})],
    // imports: [RouterModule.forRoot(routes,{useHash: false},{ preloadingStrategy : PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
