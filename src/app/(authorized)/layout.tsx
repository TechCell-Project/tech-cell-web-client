'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { LoadingPageMnt } from '@components/Common/Display/loading';
import { RootPath } from '@constants/enum';

/**
 * Renders the authorized layout component.
 * @description Require user to be logged in to access the page
 *
 * @param {Readonly<{ children: React.ReactNode }>} children - The children elements to be rendered within the layout.
 * @return {JSX.Element} The rendered component.
 */
export default function AuthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const { data: session } = useSession();

    const router = useRouter();
    const pathname = usePathname();

    if (!session?.user) {
        const loginUrlCallback = `${RootPath.Login}?callbackUrl=${pathname ?? '/'}`;
        router.replace(loginUrlCallback);
        return <LoadingPageMnt isLoading />;
    }

    return <>{children}</>;
}
