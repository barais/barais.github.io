import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AuthorPipe } from './publications/author.pipe';
import { DescbibPipe } from './publications/descbib.pipe';
import { PublicationsComponent } from './publications/publications.component';

export const containers = [
    HomeComponent,
    AboutComponent,
    PublicationsComponent,
    AuthorPipe,
    DescbibPipe,
];

export * from './home/home.component';
export * from './about/about.component';
export * from './publications/publications.component';
