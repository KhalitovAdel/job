import { Axios } from 'axios';
import { JSDOM } from 'jsdom';

import { paths } from './constants';
import { NotExpectedException } from './exceptions';
import { IndeedDetails } from './indeed.details';
import { IndeedJobPreview } from './indeed-job.preview';
import { IndeedPagePreview } from './indeed-page.preview';
import { ListQuery } from './interfaces';

export class IndeedClient {
    constructor(private readonly http: Axios) {}

    public async list(params: ListQuery = {}): Promise<IndeedPagePreview> {
        const result = await this.http.request<string>({
            method: 'GET',
            params,
            url: paths.list,
        });

        const { window } = new JSDOM(result.data);

        return new IndeedPagePreview(window.document);
    }

    public async listNextPage(page: IndeedPagePreview): Promise<IndeedPagePreview> {
        const result = await this.http.request<string>({
            method: 'GET',
            url: page.getNextLink(),
        });

        const { window } = new JSDOM(result.data);

        return new IndeedPagePreview(window.document);
    }

    /**
     * https://www.indeed.com/viewjob?jk=9702c8d391b68405&from=oj&jr=1&ia_hiring_event=1
     * Case cant find apply url
     */
    public async get(preview: IndeedJobPreview): Promise<IndeedDetails> {
        const result = await this.http.request<string>({
            method: 'GET',
            url: preview.getUrl(),
        });

        const { window } = new JSDOM(result.data);
        const instance = IndeedDetails.createFromHtml(window.document);

        const redirectResult = await this.http.request<string>({
            method: 'GET',
            url: instance.getRawApplyUrl(),
        });

        const { responseUrl: realUrl } = redirectResult.request.res;

        if (!realUrl) throw new NotExpectedException({ realUrl });

        instance.setUrl(realUrl);

        return instance;
    }
}
