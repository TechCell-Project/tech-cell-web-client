import { Montserrat } from 'next/font/google';
import 'styles/base/index.scss';
import { ThemeProviderMui } from 'components/Provider';
import { HeaderClient } from '@components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700'] });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={montserrat.className}>
                <ThemeProviderMui>
                    <HeaderClient />
                    {children}
                </ThemeProviderMui>
            </body>
        </html>
    );
}