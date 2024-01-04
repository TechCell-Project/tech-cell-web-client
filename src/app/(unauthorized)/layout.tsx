import { headers } from "next/headers";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { RootPath } from "@/constants/enum";

export default async function UnauthorizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const heads = headers();
    const pathname = heads.get('next-url');
    const session = await auth();

    if (session?.user) {
        return redirect(`/`);
    }

    return <>{children}</>;
}