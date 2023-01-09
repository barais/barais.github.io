import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-meetme',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './meetme.component.html',
    styleUrls: ['meetme.component.scss'],
})
export class MeetmeComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
