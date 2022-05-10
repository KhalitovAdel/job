export interface ListQuery {
    /**@description Find query */
    q?: string;

    /**
     * @description Location: City, state, zip code, or “remote”
     */
    l?: string;
}
