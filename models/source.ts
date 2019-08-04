export interface Source {
    url: string;
    domain: Domain;
    sourceType: SourceType;
}

export enum Domain {
    Tab4U = 'Tab4U',
    UltimateGuitar = 'UltimateGuitar'
}

export enum SourceType {
    SongPage = 'SongPage',
    ArtistPage = 'AritstPage',
    ArtistsPage = 'ArtistsPage'
}