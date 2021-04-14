/* tslint:disable: ordered-imports*/
import { NgModule, APP_INITIALIZER, ModuleWithProviders, SecurityContext } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

/* Third Party */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@modules/icons/icons.module';

const thirdParty = [IconsModule, NgbModule];

import { MarkdownModule } from 'ngx-markdown';

/* Containers */
import * as appCommonContainers from './containers';

/* Components */
import * as appCommonComponents from './components';

/* Guards */
import * as appCommonGuards from './guards';

/* Services */
import * as appCommonServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ...thirdParty,
        MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    ],
    declarations: [...appCommonContainers.containers, ...appCommonComponents.components],
    exports: [...appCommonContainers.containers, ...appCommonComponents.components, ...thirdParty],
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders<AppCommonModule> {
        return {
            ngModule: AppCommonModule,
            providers: [...appCommonServices.services, ...appCommonGuards.guards],
        };
    }
}
