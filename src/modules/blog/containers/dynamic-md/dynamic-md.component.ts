import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import marked from "marked";
import posts from "../../../../dynamicRoutes.json"

@Component({
    selector: "sb-dynamic-md",
    templateUrl: "./dynamic-md.component.html",
    styleUrls: ["./dynamic-md.component.scss"],
})
export class DynamicMdComponent implements OnInit {
    post!: any;
    defaultBackground = 'url("assets/img/home-bg.jpg")';
    mdContent: any;
    private httpOptions = {
        headers: new HttpHeaders({
            Accept: "text/html, application/xhtml+xml, */*",
        }),
        responseType: "text" as "json",
    };

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        private sanitized: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.activatedRoute.url.subscribe((f) => {
            const selectedPost = posts.filter(
                (p) => p.path === f.slice(1).join('/')
            );
            if (selectedPost.length > 0) {
                this.post = selectedPost[0];
            }
            if (this.post.mdsource != null) {
                this.http
                    .get(this.post.mdsource + "/download", this.httpOptions)
                    .subscribe((res) => {
                        this.mdContent = this.sanitized.bypassSecurityTrustHtml(
                            marked(res as string)
                        );
                    });
            }
        });
    }
}
