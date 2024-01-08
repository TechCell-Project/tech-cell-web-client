'use client';

import { LoadingPage } from '@components/Common/Display';
import { Profile } from '@components/Features';
import { useProfile } from '@hooks/useProfile';

export default function Page() {
    const { status } = useProfile();

    return status === 'loading' ? <LoadingPage /> : <Profile />;
}
