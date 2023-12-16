'use client';

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

interface Props {
    icon: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    styles?: React.CSSProperties;
    isBadge?: boolean;
    badgeInvisible?: boolean;
    badgeContent?: number;
    tooltip?: string;
}

export const IconBtn = (
    { icon, onClick, styles, isBadge = false, badgeInvisible = false, badgeContent, tooltip = undefined }: Props) => {
    const renderButton = () => {
        return (
            <IconButton
                onClick={onClick}
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)', p: '8px', ...styles }}
            >
                {isBadge ? (
                    <Badge
                        badgeContent={badgeContent}
                        color='primary'
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        invisible={badgeInvisible}
                        sx={{
                            '& .MuiBadge-badge': {
                                borderRadius: '.5rem',
                            },
                        }}
                    >
                        {icon}
                    </Badge>
                ) : (
                    <>
                        {icon}
                    </>
                )}
            </IconButton>
        );
    };

    return tooltip ? (
        <Tooltip title={tooltip} placement='bottom'>
            {renderButton()}
        </Tooltip>
    ) : (
        <>
            {renderButton()}
        </>
    );
};

