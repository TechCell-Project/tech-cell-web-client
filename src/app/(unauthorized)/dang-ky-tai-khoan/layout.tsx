import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Đăng ký tài khoản - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
