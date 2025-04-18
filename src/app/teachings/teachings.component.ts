import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
    selector: 'sb-teachings',
    templateUrl: './teachings.component.html',
    styleUrls: ['./teachings.component.scss'],
})
export class TeachingsComponent implements OnInit {
    constructor(private router: Router, private scully: ScullyRoutesService) {}

    title!: string;
    blogPosts!: ScullyRoute[];

    bakgroundImg = 'url("assets/img/home-bg.jpg")';

    ngOnInit(): void {
        this.title = this.router.url.replace('/', '');
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
        if (this.title === 'Blog'){
            this.bakgroundImg = 'url("assets/img/blog-bg.jpg")';
        }
        this.scully.available$.subscribe((routes: ScullyRoute[]) => {
            this.blogPosts = routes.filter(
                (route: ScullyRoute) =>
                    route.route.startsWith(this.router.url) && route.sourceFile?.endsWith('.md')
            );
        });
    }
}
