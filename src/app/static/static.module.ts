import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from '@common/app-common.module';
import { BlogModule } from '@modules/blog/blog.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ScullyContentModule } from '@scullyio/ng-lib';

import { StaticRoutingModule } from './static-routing.module';
import { StaticComponent } from './static.component';

@NgModule({
    declarations: [StaticComponent],
    imports: [
        CommonModule,
        ScullyContentModule,
        StaticRoutingModule,
        AppCommonModule.forRoot(),
        NavigationModule.forRoot(),
        BlogModule,
    ],
})
export class StaticModule {}
