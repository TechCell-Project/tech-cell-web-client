'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingPageMnt } from '@components/Common/Display/loading';
import { RootPath } from '@constants/enum';

/**
 * Renders the UnauthorizedLayout component.
 *
 * @param {Readonly<{ children: React.ReactNode }>} param - An object containing the children prop, which is a React node.
 * @return {JSX.Element} The rendered UnauthorizedLayout component.
 */
export default function UnauthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const { data: session } = useSession();
    const router = useRouter();

    if (session?.user) {
        router.replace(RootPath.Home);
        return <LoadingPageMnt isLoading />;
    }

    return <>{children}</>;
}
