export class NotExpectedException extends Error {
    public readonly code = 'NOT_EXPECTED_EXCEPTION';

    public reason?: object;

    constructor(fieldObject: Record<string, unknown>) {
        const key: keyof typeof fieldObject = Object.keys(fieldObject).find(Boolean) || 'VALUE_NOT_PROVIDED';

        const reason = {
            key,
            expectedValue: fieldObject[key],
        };

        super();
        this.reason = reason;
    }

    public static throw(...args: ConstructorParameters<typeof NotExpectedException>): never {
        throw new NotExpectedException(...args);
    }
}
