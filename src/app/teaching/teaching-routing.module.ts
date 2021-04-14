import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachingsComponent } from '@app/teachings/teachings.component';

import { TeachingComponent } from './teaching.component';

const routes: Routes = [
    {
        path: ':slug',
        component: TeachingComponent,
    },
    {
        path: '**',
        component: TeachingsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeachingRoutingModule {}
