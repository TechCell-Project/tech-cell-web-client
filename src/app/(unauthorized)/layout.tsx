import { authOptions } from '@app/api/auth/[...nextauth]/route';
import { getServerSession} from 'next-auth';
import { redirect } from 'next/navigation';

export default async function UnauthorizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const redirectDestination = '/';
    const session = await getServerSession(authOptions);

    if (session?.user) {
        return redirect(redirectDestination);
    }

    return <>{children}</>;
}
