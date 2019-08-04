import { JSDOM } from 'jsdom';

export class HtmlParserService {

    constructor(){
    }

    getDocument = (html: string) => {
        const htmlDoc = new JSDOM(html);

        return htmlDoc;
    }

    getValues = <T>(docmunet: JSDOM, querySelector: string, format: (element: Element) => T) => {
        const elements = docmunet.window.document.querySelectorAll(querySelector);
        
        let fomattedElements: T[] = [];

        elements.forEach(e => fomattedElements.push(format(e)));

        return fomattedElements;
    }
}