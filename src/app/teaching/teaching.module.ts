import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '@common/app-common.module';
import { BlogModule } from '@modules/blog/blog.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ScullyContentModule } from '@scullyio/ng-lib';

import { SortByPipe } from '../sort-by.pipe';
import { TeachingsComponent } from '../teachings/teachings.component';

import { TeachingRoutingModule } from './teaching-routing.module';
import { TeachingComponent } from './teaching.component';

@NgModule({
    declarations: [TeachingComponent, TeachingsComponent, SortByPipe],
    imports: [
        CommonModule,
        ScullyContentModule,
        TeachingRoutingModule,
        AppCommonModule.forRoot(),
        NavigationModule.forRoot(),
        BlogModule,
    ],
})
export class TeachingModule {}
