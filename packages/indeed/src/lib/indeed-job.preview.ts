import { NotExpectedException } from './exceptions';

export class IndeedJobPreview {
    constructor(private readonly url: string, private readonly name: string, private readonly description: string) {}

    public getUrl(): string {
        return this.url;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public static createFromHtml(element: HTMLDivElement): IndeedJobPreview {
        const { name, url } = IndeedJobPreview.getDataFromHref(element);
        const description = IndeedJobPreview.getDescription(element);

        return new IndeedJobPreview(url, name, description);
    }

    private static getDataFromHref(element: HTMLDivElement): {
        url: string;
        name: string;
    } {
        const hrefElement = element.querySelector<HTMLAnchorElement>('h2.jobTitle a[href]');

        if (!hrefElement) throw new NotExpectedException({ hrefElement });
        const titleElement = element.querySelector('h2.jobTitle span[title]');
        if (!titleElement) throw new NotExpectedException({ titleElement });

        return { name: titleElement.innerHTML, url: hrefElement.href };
    }

    private static getDescription(element: HTMLDivElement): string {
        const descriptionElement = element.querySelector('div[class="job-snippet"]');

        if (!descriptionElement) throw new NotExpectedException({ descriptionElement });

        return descriptionElement.innerHTML;
    }
}
