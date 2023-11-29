import React from 'react';
import { Metadata } from 'next/types';
import Login from './page';

export const metadata: Metadata = {
    title: 'Đăng Nhập - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
}
