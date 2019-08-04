import { Target } from '.';

export interface DownloadClient {
    getFile: (target: Target) => Promise<string>;
}