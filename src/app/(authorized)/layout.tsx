'use client';

import { usePathname, useRouter } from 'next/navigation';
import { RootPath } from '@constants/enum';
import { useSession } from 'next-auth/react';
import { LoadingPageMnt } from '@components/Common/Display/loading';

/**
 * @description Require user to be logged in to access the page
 */
export default function AuthorizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: session } = useSession();

    const router = useRouter();
    const pathname = usePathname();

    if (!session?.user) {
        const loginUrlCallback = `${RootPath.Login}?callbackUrl=${pathname ?? '/'}`;
        router.push(loginUrlCallback);
        return <LoadingPageMnt isLoading />;
    }

    return <>{children}</>;
}
