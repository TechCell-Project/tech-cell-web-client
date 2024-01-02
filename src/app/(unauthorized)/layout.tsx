import { auth } from '@libs/next-auth';
import { redirect } from 'next/navigation';

export default async function UnauthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const redirectDestination = '/';
    const session = await auth();

    if (session?.user) {
        return redirect(redirectDestination);
    }

    return <>{children}</>;
}
