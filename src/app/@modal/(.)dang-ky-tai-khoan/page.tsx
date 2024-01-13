'use client';

import { useRouter } from 'next/navigation';
import RegisterPage from '@/components/Pages/Register/Register';
import ShowDialog from '@components/Common/Display/DialogCustom';

export default function RegisterParallel() {
    const router = useRouter();

    return (
        <ShowDialog
            dialogTitle='Đăng ký tài khoản'
            isOpen={true}
            handleClose={() => {
                router.back();
            }}
        >
            <RegisterPage />
        </ShowDialog>
    );
}
