import React, { ReactNode } from 'react';

export default async function UnAuthorizedLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
