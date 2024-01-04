import React, { ReactNode } from 'react';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { RootPath } from '@constants/enum';
import { auth } from '@/auth';

export default async function AuthorizedLayout({ children }: Readonly<{ children: ReactNode }>) {
    const heads = headers();
    const pathname = heads.get('next-url');

    const session = await auth();

    if (!session?.user) {
        redirect(`${RootPath.Login}?callbackUrl=${pathname}`);
    }

    return <>{children}</>;
}