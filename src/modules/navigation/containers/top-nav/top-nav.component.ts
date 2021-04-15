import { Component, OnInit } from "@angular/core";
import posts from "../../../../dynamicRoutes.json"
@Component({
    selector: "sb-top-nav",
    templateUrl: "./top-nav.component.html",
    styleUrls: ["top-nav.component.scss"],
})
export class TopNavComponent implements OnInit {
    isMenuCollapsed = true;
    mainMenuEntries: string[] = [];
    mainMenuMap: Map<string, any[]> = new Map();
    mainStaticMenu: any[] = [];

    constructor(
    ) { }
    ngOnInit() {
        this.mainMenuEntries = [];
        this.mainMenuMap = new Map();
        posts.filter((p) => p.type === 'dynamic').forEach((p) => {
            if (!this.mainMenuEntries.includes(p.path.split("/")[0])) {
                this.mainMenuEntries.push(p.path.split("/")[0]);
                this.mainMenuMap.set(p.path.split("/")[0], []);
            }
            this.mainMenuMap.get(p.path.split("/")[0])?.push(p);
        });
        posts.filter((p) => p.type === 'static').forEach((p) => {
            const paths = p.path.split("/");
            if (paths.length == 1){
                this.mainStaticMenu.push(p);
            } else if (paths.length == 2)
            if (!this.mainMenuEntries.includes(p.path.split("/")[0])) {
                this.mainMenuEntries.push(p.path.split("/")[0]);
                this.mainMenuMap.set(p.path.split("/")[0], []);
            }
            this.mainMenuMap.get(p.path.split("/")[0])?.push(p);
        });
    }

    getPathPrefix(p: any){
        if (p.type === 'static'){
            return 's';
        } else {
            return 'd';
        }
    }
}
