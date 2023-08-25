"use client";

import { authenticate } from '@store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(authenticate());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const timeout = setTimeout(() => {
                router.replace('/');
            }, 200);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isAuthenticated]);

    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}