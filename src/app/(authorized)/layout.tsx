import React from 'react';

/**
 * Renders the authorized layout component.
 * @description Require user to be logged in to access the page
 *
 * @param {Readonly<{ children: React.ReactNode }>} children - The children elements to be rendered within the layout.
 * @return {JSX.Element} The rendered component.
 */
export default async function AuthorizedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
