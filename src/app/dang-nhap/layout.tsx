import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Đăng Nhập - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function LoginLayout() {
    return (
        <>
            <Login />
        </>
    );
}
