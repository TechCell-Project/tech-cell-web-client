'use client';

import { LoginPage } from '@/components/Pages/Login';
import ShowDialog from '@components/Common/Display/DialogCustom';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function LoginParallel() {
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
        <ShowDialog dialogTitle='Đăng nhập' isOpen={true} handleClose={handleClose} isSmall={false}>
            <LoginPage />
        </ShowDialog>
    );
}
