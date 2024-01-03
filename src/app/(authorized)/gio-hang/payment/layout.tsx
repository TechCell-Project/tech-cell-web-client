import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Đặt hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function PaymentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}