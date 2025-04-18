import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
@Component({
    selector: 'sb-static',
    templateUrl: './static.component.html',
    styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {
    $blogPostMetadata!: any;

    constructor(private activatedRoute: ActivatedRoute, private scully: ScullyRoutesService) {}

    ngOnInit(): void {
        this.$blogPostMetadata = combineLatest([
            this.activatedRoute.params.pipe(pluck('slug')),
            this.scully.available$,
        ]).pipe(map(([slug, routes]) => routes.find((route) => route.route === `/s/${slug}`)));
    }
}
