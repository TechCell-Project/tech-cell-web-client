import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { RootPath } from '@constants/enum';

export default async function AuthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession();

    if (!session?.user) {
        return redirect(RootPath.Login);
    }

    return <>{children}</>;
}