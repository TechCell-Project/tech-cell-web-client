'use client';

import { ThemeProvider } from '@mui/material';
import { theme } from '@components/Theme/MuiCustomTheme';
import React from 'react';

export const ThemeProviderMui = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
