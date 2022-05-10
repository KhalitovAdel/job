import { NotExpectedException } from './exceptions';

export class IndeedDetails {
    private url?: URL;

    protected constructor(private readonly rawApplyUrl: string) {}

    public getRawApplyUrl(): string {
        return this.rawApplyUrl;
    }

    public getUrl(): URL {
        if (!this.url) throw new NotExpectedException({ url: this.url });

        return this.url;
    }

    public setUrl(rawUrl: string | URL): this {
        if (!rawUrl) throw new NotExpectedException({ rawUrl });
        this.url = rawUrl instanceof URL ? rawUrl : new URL(rawUrl);

        return this;
    }

    public static createFromHtml(document: Document): IndeedDetails {
        const rawApplyUrl = IndeedDetails.getRawApplyLink(document);

        return new IndeedDetails(rawApplyUrl);
    }

    public static getRawApplyLink(document: Document): string {
        const hrefElement = document.querySelector<HTMLAnchorElement>('div[id="applyButtonLinkContainer"] a');

        if (!hrefElement) throw new NotExpectedException({ hrefElement });

        const href = hrefElement.href;

        if (!href || typeof href !== 'string') throw new NotExpectedException({ href });

        return href;
    }
}
