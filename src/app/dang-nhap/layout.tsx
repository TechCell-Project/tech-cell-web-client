import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';
import { auth } from '@libs/next-auth';
import { RootPath } from '@constants/enum';

export const metadata: Metadata = {
    title: 'Đăng Nhập - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();

    if (session?.user) {
        redirect(RootPath.Home);
    }

    return <>{children}</>;
}
