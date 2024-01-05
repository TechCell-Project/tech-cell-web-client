'use client';

import React from 'react';
import Typography from '@mui/material/Typography';

interface Props {
    label: string;
    content?: string;
    stylesLabel?: React.CSSProperties;
    titleNoContent?: string;
    unit?: React.ReactNode;
}

export const TextView = (
    {
        label,
        content,
        titleNoContent = '.......',
        stylesLabel,
        unit,
    }: Props) => {

    return (
        <Typography
            sx={{
                ...stylesLabel, fontSize: '15px', '& svg': {
                    verticalAlign: 'sub',
                },
            }}
        >
            {label}:
            <b style={{ fontSize: '15px', fontWeight: 500 }}> {content ?? titleNoContent} </b>
            {unit && unit}
        </Typography>
    );
};