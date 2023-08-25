import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { HeaderClient, FooterClient } from 'components/Navigation';
import 'styles/base/index.scss';
import { ThemeProviderMui } from 'components/Provider';
import { ReduxProvider } from '@components/Provider/ReduxProvider';
import styles from '../styles/components/button.module.scss'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
    title: 'TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={`${montserrat.className} ${styles.body}`}>
                <ThemeProviderMui>
                    <ReduxProvider>
                        <HeaderClient />
                        {children}
                        <FooterClient />
                    </ReduxProvider>
                </ThemeProviderMui>
            </body>
        </html>
    );
}
