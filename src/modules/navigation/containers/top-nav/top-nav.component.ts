import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    isOnPost = false;
    isMenuCollapsed = true;

    constructor(
        private navigationService: NavigationService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.subscription.add(
            this.navigationService.currentComponent$().subscribe((currentComponentName) => {
                this.isOnPost = currentComponentName === 'PostComponent';
            })
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    editPost() {
        this.router.navigateByUrl(`/edit/${this.route.snapshot.params.post}`);
    }
}
