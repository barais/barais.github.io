import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';

import { Doc, PublicationResponse } from './publicationmodel';

@Component({
    selector: 'sb-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
    docsPerYear: Map<number, Doc[]> = new Map();
    years: number[] = [];
    data: { text: any; value: number }[] = [];

    stopwords = new Set([
        // FR
        'le',
        'la',
        'les',
        'dans',
        'des',
        'present',
        'de',
        'du',
        'en',
        'à',
        'qui',
        'sont',
        'cet',
        'cette',
        'notre',
        'un',
        'une',
        'est',
        'ces',
        // tslint:disable-next-line:prettier
        'd\'un',
        'avec',
        'et',
        'pour',
        'par',
        'los',
        'sistemas',
        'para',
        'ce',
        'sur',
        'modelos',
        'nous',
        'je',
        'tu',
        'il',
        'elle',
        'ils',
        'elles',
        'vous',
        'el',
        'se',
        'au',
        'aux',
        'afin',
        'leur',
        'partir',
        'comme',
        'peuvent',
        'deux',
        'pas',
        'ainsi',
        'proposons',
        'être',
        'son',
        // EN https://gist.github.com/sebleier/554280
        'a',
        'about',
        'above',
        'after',
        'again',
        'against',
        'ain',
        'all',
        'am',
        'an',
        'and',
        'any',
        'are',
        'aren',
        // tslint:disable-next-line:prettier
        'aren\'t',
        'as',
        'at',
        'be',
        'because',
        'been',
        'before',
        'being',
        'below',
        'between',
        'both',
        'but',
        'by',
        'can',
        'couldn',
        // tslint:disable-next-line:prettier
        'couldn\'t',
        'd',
        'did',
        'didn',
        // tslint:disable-next-line:prettier
        'didn\'t',
        'do',
        'does',
        'doesn',
        // tslint:disable-next-line:prettier
        'doesn\'t',
        'doing',
        'don',
        // tslint:disable-next-line:prettier
        'don\'t',
        'down',
        'during',
        'each',
        'few',
        'for',
        'from',
        'further',
        'had',
        'hadn',
        // tslint:disable-next-line:prettier
        'hadn\'t',
        'has',
        'hasn',
        // tslint:disable-next-line:prettier
        'hasn\'t',
        'have',
        'haven',
        // tslint:disable-next-line:prettier
        'haven\'t',
        'having',
        'he',
        'her',
        'here',
        'hers',
        'herself',
        'him',
        'himself',
        'his',
        'how',
        'i',
        'if',
        'in',
        'into',
        'is',
        'isn',
        // tslint:disable-next-line:prettier
        'isn\'t',
        'it',
        // tslint:disable-next-line:prettier
        'it\'s',
        'its',
        'itself',
        'just',
        'll',
        'm',
        'ma',
        'me',
        'mightn',
        // tslint:disable-next-line:prettier
        'mightn\'t',
        'more',
        'most',
        'mustn',
        // tslint:disable-next-line:prettier
        'mustn\'t',
        'my',
        'myself',
        'needn',
        // tslint:disable-next-line:prettier
        'needn\'t',
        'no',
        'nor',
        'not',
        'now',
        'o',
        'of',
        'off',
        'on',
        'once',
        'only',
        'or',
        'other',
        'our',
        'ours',
        'ourselves',
        'out',
        'over',
        'own',
        're',
        's',
        'same',
        'shan',
        // tslint:disable-next-line:prettier
        'shan\'t',
        'she',
        // tslint:disable-next-line:prettier
        'she\'s',
        'should',
        // tslint:disable-next-line:prettier
        'should\'ve',
        'shouldn',
        // tslint:disable-next-line:prettier
        'shouldn\'t',
        'so',
        'some',
        'such',
        't',
        'than',
        'that',
        // tslint:disable-next-line:prettier
        'that\'ll',
        'the',
        'their',
        'theirs',
        'them',
        'themselves',
        'then',
        'there',
        'these',
        'they',
        'this',
        'those',
        'through',
        'to',
        'too',
        'under',
        'until',
        'up',
        've',
        'very',
        'was',
        'wasn',
        // tslint:disable-next-line:prettier
        'wasn\'t',
        'we',
        'were',
        'weren',
        // tslint:disable-next-line:prettier
        'weren\'t',
        'what',
        'when',
        'where',
        'which',
        'while',
        'who',
        'whom',
        'why',
        'will',
        'with',
        'won',
        // tslint:disable-next-line:prettier
        'won\'t',
        'wouldn',
        // tslint:disable-next-line:prettier
        'wouldn\'t',
        'y',
        'you',
        // tslint:disable-next-line:prettier
        'you\'d',
        // tslint:disable-next-line:prettier
        'you\'ll',
        // tslint:disable-next-line:prettier
        'you\'re',
        // tslint:disable-next-line:prettier
        'you\'ve',
        'your',
        'yours',
        'yourself',
        'yourselves',
        'could',
        // tslint:disable-next-line:prettier
        'he\'d',
        // tslint:disable-next-line:prettier
        'he\'ll',
        // tslint:disable-next-line:prettier
        'he\'s',
        // tslint:disable-next-line:prettier
        'here\'s',
        // tslint:disable-next-line:prettier
        'how\'s',
        // tslint:disable-next-line:prettier
        'i\'d',
        // tslint:disable-next-line:prettier
        'i\'ll',
        // tslint:disable-next-line:prettier
        'i\'m',
        // tslint:disable-next-line:prettier
        'i\'ve',
        // tslint:disable-next-line:prettier
        'let\'s',
        // tslint:disable-next-line:prettier
        'ought',
        // tslint:disable-next-line:prettier
        'she\'d',
        // tslint:disable-next-line:prettier
        'she\'ll',
        // tslint:disable-next-line:prettier
        'that\'s',
        // tslint:disable-next-line:prettier
        'there\'s',
        // tslint:disable-next-line:prettier
        'they\'d',
        // tslint:disable-next-line:prettier
        'they\'ll',
        // tslint:disable-next-line:prettier
        'they\'re',
        // tslint:disable-next-line:prettier
        'they\'ve',
        // tslint:disable-next-line:prettier
        'we\'d',
        // tslint:disable-next-line:prettier
        'we\'ll',
        // tslint:disable-next-line:prettier
        'we\'re',
        // tslint:disable-next-line:prettier
        'we\'ve',
        // tslint:disable-next-line:prettier
        'what\'s',
        // tslint:disable-next-line:prettier
        'when\'s',
        // tslint:disable-next-line:prettier
        'where\'s',
        // tslint:disable-next-line:prettier
        'who\'s',
        // tslint:disable-next-line:prettier
        'why\'s',
        // tslint:disable-next-line:prettier
        'would',
    ]);

    // Extracted from logo.svg
    // TODO: Word stemming to avoid having language and languages

    FONT = 'Impact';

    TERM_COUNT = 20;
    large = 1;
    height = 1;
    innerWidth = window.innerWidth;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        const idhal = 'olivierbarais';
        this.onResize({});
        console.log(this.innerWidth);

        this.http
            .get<PublicationResponse>(
                'https://api.archives-ouvertes.fr/search/?omitHeader=true&wt=json&q=authIdHal_s%3A%28' +
                    idhal +
                    '%29&sort=producedDate_s%20desc&rows=2000&fl=authFullName_s,title_s,producedDateY_i,label_s,citationFull_s,keyword_s,producedDateY_i,linkExtUrl_s,fileMain_s,description_s,halId_id,language_s,publicationDateY_i,publicationDateY_s,uri_s'
            )
            .subscribe((r) => {
                // tslint:disable-next-line:prettier
                // tslint:disable-next-line:no-unused-expression
                const d1: { text: any; value: number }[] = [];
                this.termCount(r.response.docs)
                    .slice(0, this.TERM_COUNT)
                    .forEach((e: any) => {
                        d1.push({ text: e.term, value: e.count * 10 });
                    });
                this.data = d1;
                r.response.docs.forEach((d) => {
                    // tslint:disable-next-line:no-unused-expression
                    if (!this.docsPerYear.has(d.publicationDateY_i)) {
                        this.docsPerYear.set(d.publicationDateY_i, []);
                    }
                    this.docsPerYear.get(d.publicationDateY_i)?.push(d);
                });
                this.years = Array.from(this.docsPerYear.keys());
            });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth > 1200) {
            this.large = 1000;
            this.height = 300;
        } else if (this.innerWidth > 992) {
            this.large = 700;
            this.height = 200;
        } else if (this.innerWidth > 500) {
            this.large = 500;
            this.height = 150;
        } else {
            this.large = this.innerWidth;
            this.height = 150;
        }
    }

    terms(publications: Doc[]): string[] {
        const res: string[] = [];
        for (const pub of publications) {
            pub.keyword_s?.forEach((kw) => {
                kw.split(/\s+/)
                    .filter((x) => x && !this.stopwords.has(x))
                    .forEach((part) => {
                        res.push(part.toLowerCase());
                    });
            });
        }
        return res;
    }

    termCount(publications: Doc[]): any {
        const histogram: Map<string, number> = new Map();

        for (const term of this.terms(publications)) {
            histogram.set(term, ((histogram.has(term) ? histogram.get(term) : 0) as number) + 1);
        }

        const result = Array.from(histogram, ([key, value]) => {
            return { term: key, count: value };
        });
        result.sort((x, y) => y.count - x.count);
        return result;
    }

    public color(word: any, index: number): string {
        const colorscale = [
            '#ef2727',
            '#b92b32',
            '#b63138',
            '#b23440',
            '#af3845',
            '#9f4e66',
            '#9f4e66',
            '#9a4f69',
            '#9d536c',
            '#8e6488',
            '#986b92',
            '#a2729c',
            '#636f94',
            '#6b789f',
            '#5c80aa',
            '#587e8c',
            '#55769e',
            '#7581ab',
            '#6fa39c',
            '#689993',
            '#6ba083',
            '#6ca47a',
            '#6ea874',
            '#70ac6f',
            '#73ae72',
            '#618e88',
            '#5a847e',
            '#659b6b',
            '#5e9063',
            '#78c05f',
            '#71b258',
            '#74ba46',
            '#76c135',
            '#78c92b',
            '#7bc039',
            '#81d32f',
            '#7ac52c',
            '#82c131',
            '#81c130',
            '#8ec23e',
            '#91bb3c',
            '#93bb3e',
            '#adc14a',
            '#adc14a',
            '#bdb954',
            '#b1ad4e',
            '#a5a14a',
            '#cdb25f',
            '#c1a85a',
            '#d9ae63',
            '#cba15d',
            '#ddaa5c',
            '#e1a853',
            '#d19f4f',
            '#c39249',
            '#c39249',
            '#b58842',
            '#b48742',
            '#e0a852',
            '#d49c4a',
            '#c59145',
            '#e5a549',
            '#d8a04c',
            '#e8a444',
            '#d8993f',
            '#d89940',
            '#ca8e38',
            '#bc8433',
            '#eaa23b',
            '#da983a',
            '#cc8d34',
            '#bd8332',
            '#eaa23b',
            '#dd9735',
            '#cc8c34',
            '#ec9637',
            '#ec9637',
            '#dc8e37',
            '#cc812f',
            '#ea8a37',
            '#da8335',
            '#cb782f',
            '#e98135',
            '#da7931',
            '#cb702d',
            '#e87733',
            '#e87733',
            '#d9702f',
            '#e76f31',
            '#d8682f',
            '#e9713e',
            '#e76635',
            '#e76032',
            '#e02424',
            '#d12323',
            '#a04b62',
            '#7d89b7',
            '#c42020',
            '#bf262a',
            '#a84152',
            '#ab3d4b',
            '#a3495e',
            '#a4465a',
            '#a74356',
            '#ab3c4b',
        ];
        return colorscale[Math.round(Math.random() * colorscale.length)];
    }
}
