import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@app/api/auth/[...nextauth]/route';

export const metadata: Metadata = {
    title: 'Giỏ hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function PrivateLayout({ children }: Readonly<{ children: ReactNode }>) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/dang-nhap?callbackUrl=/gio-hang-v2');
    }
    else {
        console.log(session.user.accessToken);
    }

    return <>{children}</>;
}