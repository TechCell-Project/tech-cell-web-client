'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingPageMnt } from '@components/Common/Display/loading';
import { RootPath } from '@constants/enum';
import { resolveCallbackUrl } from '@utils/shared.util';

/**
 * Renders the UnauthorizedLayout component.
 *
 * @param {Readonly<{ children: React.ReactNode }>} param - An object containing the children prop, which is a React node.
 * @return {JSX.Element} The rendered UnauthorizedLayout component.
 */
export default function UnauthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    if (status === 'loading') {
        return <LoadingPageMnt isLoading />;
    }

    if (session?.user) {
        router.replace(
            resolveCallbackUrl({
                callBackUrl: searchParams.get('callbackUrl'),
                fallback: RootPath.Home,
            }),
        );
        return <LoadingPageMnt isLoading />;
    }

    return <>{children}</>;
}
