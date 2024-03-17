import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Tìm kiếm  - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function SearchingPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
