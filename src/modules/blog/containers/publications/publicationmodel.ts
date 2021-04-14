export interface PublicationResponse {
    response: Response;
}

export interface Response {
    numFound: number;
    start: number;
    docs: Doc[];
}

export interface Doc {
    label_s: string;
    citationFull_s: string;
    title_s: string[];
    keyword_s?: string[];
    authFullName_s: string[];
    language_s: Language[];
    uri_s: string;
    producedDateY_i: number;
    publicationDateY_i: number;
    fileMain_s?: string;
    linkExtUrl_s?: string;
    description_s?: string;
}

export enum Language {
    En = 'en',
    Fr = 'fr',
}
