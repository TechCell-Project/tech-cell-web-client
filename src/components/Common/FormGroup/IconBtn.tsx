'use client';

import React from 'react';
import IconButton, { IconButtonTypeMap } from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { ExtendButtonBase } from '@mui/material';

interface Props {
    icon: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    styles?: React.CSSProperties;
    isBadge?: boolean;
    badgeInvisible?: boolean;
    badgeContent?: number;
    badgeVariant?: 'standard' | 'dot';
    tooltip?: string;
    iconProps?: ExtendButtonBase<IconButtonTypeMap<{}, 'button'>>;
}

export const IconBtn = (
    {
        icon,
        onClick,
        styles,
        isBadge = false,
        badgeInvisible = false,
        badgeContent,
        badgeVariant = 'standard',
        tooltip = undefined,
        iconProps,
    }: Props) => {
    const renderButton = () => {
        return (
            <IconButton
                onClick={onClick}
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)', p: '8px', ...styles }}
                {...iconProps}
            >
                {isBadge ? (
                    <Badge
                        badgeContent={badgeContent}
                        color='primary'
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        variant={badgeVariant}
                        invisible={badgeInvisible}
                        sx={{
                            '& .MuiBadge-badge': {
                                borderRadius: badgeVariant === 'standard' ? '.5rem' : '50%',
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

