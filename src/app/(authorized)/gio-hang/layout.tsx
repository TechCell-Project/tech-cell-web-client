import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Giỏ hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}