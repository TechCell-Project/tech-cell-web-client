import { ReactNode } from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Đăng Nhập - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function LoginParallelLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
