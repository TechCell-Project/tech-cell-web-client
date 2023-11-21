import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const { data: session } = useSession();

    if (session?.user) {
        return router.replace('/');
    }

    return <>{children}</>;
}
