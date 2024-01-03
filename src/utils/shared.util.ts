export function createInitialValues<T extends Record<string, any>>(): T {
    return new Proxy({} as T, {
        get: () => '',
    });
}
