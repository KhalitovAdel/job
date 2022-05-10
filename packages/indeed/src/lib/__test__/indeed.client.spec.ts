import { Axios } from 'axios';

import { getRedirectResponse, getResponse } from '../__mocks__/indeed-get.response';
import { listResponse } from '../__mocks__/indeed-list.response';
import { NotExpectedException } from '../exceptions';
import { IndeedClient } from '../indeed.client';

describe('IndeedClient', () => {
    const axios = new Axios({
        baseURL: 'https://www.indeed.com',
    });

    const client = new IndeedClient(axios);

    afterEach(() => jest.restoreAllMocks());

    it('list', async () => {
        jest.spyOn(axios, 'request').mockResolvedValue(listResponse);
        const result = await client.list({ q: 'javascript' });
        expect(result).toBeDefined();
    });

    it('get', async () => {
        jest.spyOn(axios, 'request')
            .mockResolvedValueOnce(listResponse)
            .mockResolvedValueOnce(getResponse)
            .mockResolvedValueOnce(getRedirectResponse);

        const page = await client.list({ q: 'javascript' });
        if (!page) throw new NotExpectedException({ page });

        const [first] = page.getPreviews();
        expect(first).toBeDefined();
        if (!first) throw new NotExpectedException({ first });
        const result = await client.get(first);
        expect(result).toBeDefined();
    });
});
