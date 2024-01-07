import React, { ReactNode } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { RootPath } from '@constants/enum';
import { auth } from '@libs/next-auth';
import { getSession } from 'next-auth/react';

export default async function UnAuthorizedLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
