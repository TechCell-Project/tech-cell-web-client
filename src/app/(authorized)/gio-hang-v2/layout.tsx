import React, { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Giỏ hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function CartLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
