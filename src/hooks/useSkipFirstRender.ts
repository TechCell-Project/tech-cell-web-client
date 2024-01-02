'client';

import { useEffect, useRef } from 'react';

export const useSkipFirstRender = (callback: () => void, dependencies: any) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (!firstRenderRef.current) {
            callback();
        }
    }, [...dependencies]);

    useEffect(() => {
        firstRenderRef.current = false;
    }, []);
};
