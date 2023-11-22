'use client';

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthorizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const redirectDestination = '/';

    useEffect(() => {
        async function checkAuthorization() {
            const session = await getSession();
            console.log({ session });

            if (session?.user != null) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                router.push(redirectDestination);
            }
        }

        router.prefetch(redirectDestination);
        checkAuthorization();
    }, [router]);

    if (isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
