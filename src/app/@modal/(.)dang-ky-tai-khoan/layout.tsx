import { ReactNode } from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Đăng ký tài khoản - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function RegisterLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
