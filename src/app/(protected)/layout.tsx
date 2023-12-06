import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@app/api/auth/[...nextauth]/route';
import instanceAuth from '@config/instanceAuth.config';


export default async function PrivateLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/dang-nhap?callbackUrl=/gio-hang-v2');
    }
    // console.log('session: ');
    // console.log(session);

    return <>{children}</>;
}