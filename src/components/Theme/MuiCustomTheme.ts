import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        primary: {
            main: string;
            darker: string;
        };
        color: {
            red: string;
            lightRed: string;
            black: string;
            lightBlack: string;
            gray: string;
            lightGray: string;
        };
        fontFamily: {
            primary: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        primary?: {
            main?: string;
            darker?: string;
        };
        color?: {
            red?: string;
            lightRed?: string;
            black?: string;
            lightBlack?: string;
            gray?: string;
            lightGray?: string;
        };
        fontFamily?: {
            primary: string;
        };
    }
}

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#ee4949',
        }
    },
    primary: {
        main: '#ee4949',
        darker: '#eb2525',
    },
    color: {
        red: '#ee4949',
        lightRed: 'rgba(238, 73, 73, 0.15)',
        black: '#3b3b3b',
        lightBlack: 'rgba(59, 59, 59, 0.15)',
        gray: '#777777',
        lightGray: '#d3d3d3',
    },
    fontFamily: {
        primary: "'Montserrat', sans-serif",
    },
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
    spacing: 5,
    components: {
        MuiFormControl: {
            variants: [
                {
                    props: { variant: 'standard' },
                    style: {
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderColor: '#ee4949',
                        },
                    },
                },
            ],
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderColor: '#ee4949',
                    },
                    '&:after': {
                        borderColor: '#ee4949',
                    },
                },
            },
        },
    },
});
