'use client';

import { useSession } from 'next-auth/react';
import { LoadingPageMnt } from '@components/Common/Display/loading';

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
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <LoadingPageMnt isLoading />;
    }

    return <>{children}</>;
}
