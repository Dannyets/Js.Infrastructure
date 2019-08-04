import { File } from '.';

export interface DownloadClient {
    getFile: (target: File) => Promise<string>;
}