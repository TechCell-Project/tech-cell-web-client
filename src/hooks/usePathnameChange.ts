import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const usePathnameChange = () => {
    const pathname = usePathname();
    const [lastPathname, setLastPathname] = useState(pathname);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (pathname !== lastPathname) {
            setHasChanged(true);
            setLastPathname(pathname);
        } else {
            setHasChanged(false);
        }
    }, [pathname, lastPathname]);

    return hasChanged;
};
