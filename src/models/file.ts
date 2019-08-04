import { FileMetada, Source, Target,  } from ".";

export class File {
    public content: string;
    public metadata: FileMetada

    constructor(source: Source, target: Target, content: string) {
        this.content = content;

        const splittedUrl = source.url.split('/');
        const id = splittedUrl[splittedUrl.length - 1];
    
        this.metadata = {
            id,
            source,
            target
        }
    }
};