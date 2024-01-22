import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Theo dõi đơn hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
