import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Thông tin khách hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}