import { ReactNode } from 'react';
import { Metadata } from 'next';
import { HeaderClient, FooterClient } from 'components/Navigation';
import { ReduxProvider, SocketProvider, ThemeProviderMui } from '@components/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/base/index.scss';
import { auth } from '@libs/next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

import FaviconIcon from '@public/favicon.ico';

export const metadata: Metadata = {
    title: 'TechCell - Điện thoại, phụ kiện chính hãng',
    description: 'Khám phá ngay với Techcell - Nơi Thăng Hoa Công Nghệ!',
};

export default async function RootLayout({
    children,
    modal,
}: Readonly<{ children: ReactNode; modal: ReactNode }>) {
    const session = await auth();

    return (
        <NextAuthSessionProvider session={session}>
            <html lang='en'>
                <head>
                    <link rel='icon' href={FaviconIcon.src} />
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link
                        rel='preconnect'
                        href='https://fonts.gstatic.com'
                        crossOrigin='anonymous'
                    />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
                        rel='stylesheet'
                    />
                </head>
                <body>
                    <ToastContainer
                        theme='colored'
                        autoClose={3000}
                        newestOnTop
                        closeOnClick
                        position='top-right'
                    />
                    <ThemeProviderMui>
                        <ReduxProvider>
                            <SocketProvider>
                                <HeaderClient />
                                {children}
                                {modal}
                                <FooterClient />
                            </SocketProvider>
                        </ReduxProvider>
                    </ThemeProviderMui>
                </body>
            </html>
        </NextAuthSessionProvider>
    );
}
