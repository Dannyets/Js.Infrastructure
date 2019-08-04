import { Source } from "./source";
import { Target } from './target';

export interface DownloadSourceEvent {
    source: Source;
    target: Target;
}