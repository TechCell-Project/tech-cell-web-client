import { redirect } from 'next/navigation';
import { RootPath } from '@constants/enum';
import { auth } from '@libs/next-auth';

/**
 * @description Require user to be logged in to access the page
 */
export default async function AuthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();

    if (!session?.user) {
        return redirect(RootPath.Login);
    }

    return <>{children}</>;
}
