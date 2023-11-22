import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { HeaderClient, FooterClient } from 'components/Navigation';
import 'styles/base/index.scss';
import { ThemeProviderMui } from 'components/Provider';
import styles from '../styles/components/button.module.scss';
import { ReduxProvider } from '@components/Provider/ReduxProvider';
import NextAuthProvider from '@components/Provider/NextAuthProvider';
import { getSession } from 'next-auth/react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
    title: 'TechCell - Điện thoại, phụ kiện chính hãng',
};

export async function getNextAuthSession() {
    const session = await getSession();
    return session;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getNextAuthSession();
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={`${montserrat.className} ${styles.body}`}>
                <NextAuthProvider {...(session ?? {})}>
                    <ThemeProviderMui>
                        <ReduxProvider>
                            <HeaderClient />
                            {children}
                            <FooterClient />
                        </ReduxProvider>
                    </ThemeProviderMui>
                </NextAuthProvider>
            </body>
        </html>
    );
}
