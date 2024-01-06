import { Metadata } from 'next';
import { HeaderClient, FooterClient } from 'components/Navigation';
import { ReduxProvider, SocketProvider, ThemeProviderMui } from '@components/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/base/index.scss';
import { auth } from '@libs/next-auth';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();

    return (
        <NextAuthSessionProvider session={session}>
            <html lang='en'>
                <head>
                    <link rel='icon' href='/public/favicon.ico' />
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
                                <FooterClient />
                            </SocketProvider>
                        </ReduxProvider>
                    </ThemeProviderMui>
                </body>
            </html>
        </NextAuthSessionProvider>
    );
}
