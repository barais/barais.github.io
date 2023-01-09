import { AboutComponent } from './about/about.component';
import { DynamicMdComponent } from './dynamic-md/dynamic-md.component';
import { HomeComponent } from './home/home.component';
import { AuthorPipe } from './publications/author.pipe';
import { DescbibPipe } from './publications/descbib.pipe';
import { PublicationsComponent } from './publications/publications.component';
import { MeetmeComponent } from './meetme/meetme.component';

export const containers = [
    HomeComponent,
    MeetmeComponent,
    AboutComponent,
    PublicationsComponent,
    DynamicMdComponent,
    AuthorPipe,
    DescbibPipe,
];

export * from './home/home.component';
export * from './about/about.component';
export * from './meetme/meetme.component';
export * from './publications/publications.component';
export * from './dynamic-md/dynamic-md.component';
