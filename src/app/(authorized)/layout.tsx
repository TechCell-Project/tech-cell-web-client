import React, { ReactNode } from 'react';
import { headers } from "next/headers";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { RootPath } from '@constants/enum';

export default async function AuthorizedLayout({ children }: Readonly<{ children: ReactNode }>) {
    const heads = headers();
    const pathname = heads.get('next-url');

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect(`${RootPath.Login}?callbackUrl=${pathname}`);
    }

    return <>{children}</>;
}