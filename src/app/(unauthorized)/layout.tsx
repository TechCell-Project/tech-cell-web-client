'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoadingPageMnt } from '@components/Common/Display/loading';

export default function UnauthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const { data: session } = useSession();
    const router = useRouter();

    if (session?.user) {
        router.back();
        return <LoadingPageMnt isLoading />;
    }

    return <>{children}</>;
}
