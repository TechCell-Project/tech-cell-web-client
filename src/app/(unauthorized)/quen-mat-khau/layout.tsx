import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Quên mật khẩu - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function ForgotPasswordLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
