import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import marked from 'marked';
import prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-visualbasic';

import posts from '../../../../dynamicRoutes.json';

// loadLanguages(['javascript', 'java', 'visualbasic', 'jsx', 'css', 'markup', 'bash', 'json']);

marked.setOptions({
    highlight(code, lang) {
        console.log(lang)
        console.log(prism.languages[lang])
        if (prism.languages[lang]) {
            console.log(prism.highlight(code, prism.languages[lang], lang));
            return prism.highlight(code, prism.languages[lang], lang);
        } else {
            return code;
        }
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

@Component({
    selector: 'sb-dynamic-md',
    templateUrl: './dynamic-md.component.html',
    styleUrls: ['./dynamic-md.component.scss'],
})
export class DynamicMdComponent implements OnInit {
    post!: any;
    defaultBackground = 'url("assets/img/home-bg.jpg")';
    mdContent: any;
    private httpOptions = {
        headers: new HttpHeaders({
            Accept: 'text/html, application/xhtml+xml, */*',
        }),
        responseType: 'text' as 'json',
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
                    .get(this.post.mdsource + '/download', this.httpOptions)
                    .subscribe((res) => {
                            console.log( marked(res as string))
                        this.mdContent = this.sanitized.bypassSecurityTrustHtml(
                            marked(res as string)
                        );
                    });
            }
        });
    }
}
