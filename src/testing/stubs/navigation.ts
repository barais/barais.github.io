import { of } from 'rxjs';
import { SBRouteData } from 'src/modules/navigation/models';
import { NavigationService } from 'src/modules/navigation/services';

export const NavigationServiceStub: Partial<NavigationService> = {
    routeData$: () => of({} as SBRouteData),
    currentURL$: () => of('TEST_CURRENT_URL'),
    currentComponent$: () => of('TEST_CURRENT_COMPONENT'),
};
