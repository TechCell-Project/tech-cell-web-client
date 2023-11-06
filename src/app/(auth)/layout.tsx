'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: session } = useSession();

    if (session?.user?.accessToken) {
        router.replace('/');
        return <></>;
    } else return <section>{children}</section>;
}
