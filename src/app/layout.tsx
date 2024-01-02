import { Metadata } from 'next';
import { HeaderClient, FooterClient } from 'components/Navigation';
import { SocketProvider, ThemeProviderMui } from 'components/Provider';
import { ReduxProvider } from '@components/Provider/ReduxProvider';
import NextAuthProvider from '@components/Provider/NextAuthProvider';
import { getSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/base/index.scss';

export const metadata: Metadata = {
    title: 'TechCell - Điện thoại, phụ kiện chính hãng',

};

export async function getNextAuthSession() {
    return await getSession();
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getNextAuthSession();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href='/public/favicon.ico' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                <link
                  href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
                  rel='stylesheet'
                />
            </head>
            <body>
                <ToastContainer theme='colored' autoClose={3000} newestOnTop closeOnClick position='top-right' />
                <NextAuthProvider {...(session ?? {})}>
                    <ThemeProviderMui>
                        <ReduxProvider>
                            <SocketProvider>
                                <HeaderClient />
                                {children}
                                <FooterClient />
                            </SocketProvider>
                        </ReduxProvider>
                    </ThemeProviderMui>
                </NextAuthProvider>
            </body>
        </html>
    );
}
