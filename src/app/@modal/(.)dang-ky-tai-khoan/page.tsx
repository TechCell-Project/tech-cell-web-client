'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import RegisterPage from '@/components/Pages/Register/Register';
import { ShowDialog } from '@components/Common/Display/DialogCustom';

export default function RegisterParallel() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleClose = () => {
        router.back();
    };

    useEffect(() => {
        if (session?.user && status === 'authenticated') {
            window.location.reload();
        }
    }, [session?.user, status]);

    return (
        <ShowDialog
            dialogTitle='Đăng ký tài khoản'
            isOpen={true}
            handleClose={handleClose}
            isSmall={false}
        >
            <RegisterPage />
        </ShowDialog>
    );
}
