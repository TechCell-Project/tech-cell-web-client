import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { HeaderClient, FooterClient } from 'components/Navigation';
import 'styles/base/index.scss';
import { ThemeProviderMui } from 'components/Provider';
import styles from '../styles/components/button.module.scss';
import { ReduxProvider } from '@components/Provider/ReduxProvider';
import NextAuthProvider from '@components/Provider/NextAuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
    title: 'TechCell - Điện thoại, phụ kiện chính hãng',
};

export async function getNextAuthSession() {
    const session = await getServerSession(authOptions);
    return session;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getNextAuthSession();
    return (
        <html lang="en">
            <head>
                <link rel="icon" href='/public/favicon.ico' />
            </head>
            <body className={`${montserrat.className} ${styles.body}`}>
                <ToastContainer theme='colored' autoClose={3000} newestOnTop closeOnClick position='top-right' />
                <NextAuthProvider {...(session ?? {})}>
                    <ThemeProviderMui>
                        <ReduxProvider>
                            <HeaderClient />
                            <div style={{ minHeight: '60vh'}}>{children}</div>
                            <FooterClient />
                        </ReduxProvider>
                    </ThemeProviderMui>
                </NextAuthProvider>
            </body>
        </html>
    );
}
