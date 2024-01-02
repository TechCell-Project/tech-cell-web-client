import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@libs/next-auth';

export const metadata: Metadata = {
    title: 'Giỏ hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function ProtectedLayout({ children }: Readonly<{ children: ReactNode }>) {
    const session = await auth();

    if (!session?.user) {
        redirect('/dang-nhap?callbackUrl=/gio-hang-v2');
    } else {
        console.log(session.user.accessToken);
    }

    return <>{children}</>;
}
