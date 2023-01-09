/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

/* Module */
import { BlogModule } from './blog.module';

/* Containers */
import * as blogContainers from './containers';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        component: blogContainers.HomeComponent,
    },
    {
        path: 'about',
        component: blogContainers.AboutComponent,
    },
    {
      path: 'meetme',
      component: blogContainers.MeetmeComponent,
  },
  {
        path: 'publications',
        component: blogContainers.PublicationsComponent,
    },
    {
        path: 'd/:cat/:slug',
        component: blogContainers.DynamicMdComponent,
    },
];


@NgModule({
    imports: [BlogModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class BlogRoutingModule {}
