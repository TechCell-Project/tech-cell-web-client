import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const redirectDestination = '/dang-nhap';
    const session = await getServerSession();

    if (!session?.user) {
        return redirect(redirectDestination);
    }

    return <>{children}</>;
}
