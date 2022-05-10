import { NotExpectedException } from './exceptions';
import { IndeedJobPreview } from './indeed-job.preview';

export class IndeedPagePreview {
    constructor(private readonly document: Document) {}

    private getNextElement(): HTMLAnchorElement | null {
        return this.document.querySelector('ul.pagination-list li a[aria-label="Next"]');
    }

    public hasNext(): boolean {
        return !!this.getNextElement();
    }

    /**
     * @return
     * Return not a full url, only "/jobs?q=&l=New+York%2C+NY&start=40"
     */
    public getNextLink(): string {
        const anchorNextElement = this.getNextElement();
        if (!anchorNextElement) throw new NotExpectedException({ anchorNextElement });
        const nextHref = anchorNextElement.href;
        if (!nextHref) throw new NotExpectedException({ nextHref });

        return nextHref;
    }

    public getPreviews(): IndeedJobPreview[] {
        return Array.from(
            this.document.querySelectorAll<HTMLDivElement>('td#resultsCol ul.jobsearch-ResultsList li div.cardOutline')
        ).map(IndeedJobPreview.createFromHtml);
    }
}
