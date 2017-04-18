import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GlobalAuthGuard } from "./global-shared/global.authguard";
import { GlobalDeactiveGuard } from "./global-shared/global.deactiveguard";
////////////////////
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { EventsComponent } from './events/events.component';
const routes : Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        outlet : 'loginPage',
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
    {
        path: 'events',
        component: EventsComponent,
        // canActivate: [GlobalAuthGuard],
        canLoad: [GlobalAuthGuard],
    },
    {
        path: 'user',
        loadChildren: 'app/user/user.module#UserModule',
        // canActivate: [GlobalAuthGuard],
        canLoad: [GlobalAuthGuard],
    },
    {
        path: 'settings',
        loadChildren : 'app/settings/settings.module#SettingsModule',
        // canActivate: [GlobalAuthGuard],
        canDeactivate: [GlobalDeactiveGuard],
        canLoad: [GlobalAuthGuard],
    },
    {
        path: 'blogs',
        loadChildren : 'app/blog/blog.module#BlogModule',
        // canActivate: [GlobalAuthGuard],
        canLoad: [GlobalAuthGuard],
    },
    {
        path: 'categories',
        loadChildren : 'app/categories/categories.module#CategoriesModule',
        // canActivate: [GlobalAuthGuard],
        canLoad: [GlobalAuthGuard],
    },
    {
        path: 'menu',
        loadChildren : 'app/menu/menu.module#MenuModule',
        // canActivate: [GlobalAuthGuard],
        canLoad: [GlobalAuthGuard],
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];

// export const AppRouting : ModuleWithProviders = RouterModule.forRoot(routes,{
//   useHash: false
// });
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
