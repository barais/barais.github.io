import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
@Component({
    selector: 'sb-teaching',
    templateUrl: './teaching.component.html',
    styleUrls: ['./teaching.component.scss'],
})
export class TeachingComponent implements OnInit {
    post!: any;
    defaultBackground = 'url("assets/img/home-bg.jpg")';
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private scully: ScullyRoutesService
    ) {}

    ngOnInit(): void {
        this.scully.getCurrent().subscribe((e) => (this.post = e));
        /*this.$blogPostMetadata = combineLatest([
            this.activatedRoute.params.pipe(pluck('slug')),
            this.scully.available$,
        ]).pipe(
            map(([slug, routes]) =>
                routes.find((route) => route.route === this.router.url + `/${slug}`)
            )
        );*/
    }
}
