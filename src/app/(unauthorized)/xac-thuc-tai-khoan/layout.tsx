import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Xác thực tài khoản - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function VerifyEmailLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
