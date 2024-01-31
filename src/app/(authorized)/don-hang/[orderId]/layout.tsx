import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Chi tiết đơn hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function OrderDetailLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
