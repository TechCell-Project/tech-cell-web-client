export function createInitialValues<T extends Record<string, unknown>>(): T {
    return new Proxy({} as T, {
        get: () => '',
    });
}

export function resolveCallbackUrl({
    callBackUrl,
    fallback,
}: {
    callBackUrl?: string | null;
    fallback: string;
}) {
    if (!callBackUrl || callBackUrl === 'null' || callBackUrl === 'undefined') {
        return fallback;
    }
    return callBackUrl;
}
