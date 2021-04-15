import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import marked from "marked";
import prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup";
// import 'prismjs/components/prism-visualbasic';

import posts from '../../../../dynamicRoutes.json';

// loadLanguages(['javascript', 'java', 'visualbasic', 'jsx', 'css', 'markup', 'bash', 'json']);

marked.setOptions({
    highlight(code, lang) {
        if (prism.languages[lang]) {
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
    xhtml: false,
});

@Component({
    selector: 'sb-dynamic-md',
    templateUrl: './dynamic-md.component.html',
    styleUrls: ['./dynamic-md.component.scss'],
})
export class DynamicMdComponent
    implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    @ViewChild('content')
    content!: ElementRef;

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
        private sanitized: DomSanitizer,
        private renderer: Renderer2
    ) {}

    public removeEventListener: (() => void) | undefined;
    public anchors!: any[];
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
                        /* var parser = new DOMParser();
                        var doc = parser.parseFromString( marked(res as string), 'text/html');
                        // console.log(doc.body);
                       // console.log(doc.querySelectorAll('h1, h2, h3'))
                        const toc =`<div id="toc_container">
                        <p class="toc_title">Contents</p>
                        <ul class="toc_list">
                          <li><a href="#First_Point_Header">1 First Point Header</a>
                          <ul>
                            <li><a href="#taa">1.1 First Sub Point 1</a></li>
                            <li><a href="#First_Sub_Point_2">1.2 First Sub Point 2</a></li>
                          </ul>
                        </li>
                        <li><a href="#Second_Point_Header">2 Second Point Header</a></li>
                        <li><a href="#Third_Point_Header">3 Third Point Header</a></li>
                        </ul>
                        </div>`*/
                        this.mdContent = this.sanitized.bypassSecurityTrustHtml(
                            marked(res as string)
                        );
                    });
            }
        });
    }

    public ngAfterViewInit() {}

    public ngOnDestroy() {
        // Cleanup by removing the event listeners on destroy
        this.anchors.forEach((anchor: HTMLAnchorElement) => {
            anchor.removeEventListener('click', this.handleAnchorClick);
        });
    }

    public handleAnchorClick = (event: Event) => {
        // Prevent opening anchors the default way
        event.preventDefault();
        const anchor = event.target as HTMLAnchorElement;
        const el = this.content.nativeElement.querySelector(
            decodeURI(anchor.href)
                .replace(window.location.origin + '/', '')
                .toLowerCase()
        );
        el?.scrollIntoView();
        // alert(`You are trying to navigate to ${anchor.href}`);
    };
    ngAfterViewChecked(): void {
        // Solution for catching click events on anchors using querySelectorAll:
        this.anchors = this.content.nativeElement.querySelectorAll('a');
        this.anchors.forEach((anchor: HTMLAnchorElement) => {
            if (anchor.href.startsWith(window.location.origin + '/#'))
                anchor.addEventListener('click', this.handleAnchorClick);
        });
    }
}
