import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'teaching',
        loadChildren: () => import('./teaching/teaching.module').then((m) => m.TeachingModule),
    },
    {
        path: 'blog',
        loadChildren: () => import('./teaching/teaching.module').then((m) => m.TeachingModule),
    },
    {
        path: 's',
        loadChildren: () => import('./static/static.module').then((m) => m.StaticModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('modules/blog/blog-routing.module').then((m) => m.BlogRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then((m) => m.ErrorRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then((m) => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
