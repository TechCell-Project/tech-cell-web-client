// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createInitialValues<T extends Record<string, any>>(): T {
    return new Proxy({} as T, {
        get: () => null,
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

export function isStatusSuccess(status?: number): boolean {
    if (!status) {
        return false;
    }
    return status >= 200 && status < 300;
}
