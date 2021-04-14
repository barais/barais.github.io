import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaticComponent } from './static.component';

const routes: Routes = [
    {
        path: ':slug',
        component: StaticComponent,
    },
    {
        path: '**',
        component: StaticComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StaticRoutingModule {}
