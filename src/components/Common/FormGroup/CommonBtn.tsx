'use client';

import React, { memo } from 'react';
import { useTheme, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';

interface IButtonProps {
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'submit' | 'button';
    variant?: 'outlined' | 'contained' | 'text';
    size?: 'large' | 'small' | 'medium';
    content: string;
    disabled?: boolean;
    fullWidth?: boolean;
    styles?: React.CSSProperties;
    defaultValue?: string;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
    colorWhite?: boolean;
    hidden?: boolean;
    isBadge?: boolean;
    badgeCount?: number;
    loading?: boolean;
}

export const CommonBtn = memo((props: IButtonProps) => {
    const theme = useTheme();

    const outlinedStyle: SxProps = {
        color: props.colorWhite
            ? '#fff !important'
            : `${theme.color.red} !important`,
        border: props.colorWhite
            ? '1px solid #fff !important'
            : `1px solid ${theme.color.red} !important`,
        textTransform: 'unset',
        padding: '8px 20px',
        width: 'max-content',
        whiteSpace: 'nowrap',
    };

    const containedStyle: SxProps = {
        bgcolor: `${theme.color.red} !important`,
        border: `1px solid ${theme.color.red} !important`,
        color: '#fff !important',
        textTransform: 'unset',
        padding: '8px 20px',
        whiteSpace: 'nowrap',
    };

    const textStyle: SxProps = {
        color: props.colorWhite
            ? `#fff !important`
            : `${theme.color.red} !important`,
        bgcolor: 'transparent',
        padding: '8px 20px',
        whiteSpace: 'nowrap',
        textTransform: 'unset',
    };

    const getVariant = () => {
        switch (props.variant) {
            case 'contained':
                return containedStyle;
            case 'outlined':
                return outlinedStyle;
            case 'text':
                return textStyle;
            default:
                return containedStyle;
        }
    };

    const renderBtn = () => {
        return (
            <Button
                type={props.type ?? 'button'}
                onClick={props.handleClick}
                sx={[{ ...props.styles }, getVariant(), { gap: '10px' }]}
                disabled={props.disabled}
                size={props.size}
                fullWidth={props.fullWidth}
                defaultValue={props.defaultValue}
                startIcon={props.startIcon}
                endIcon={props.endIcon}
                hidden={props.hidden}
            >
                {props.content}
                {props.loading && (
                    <CircularProgress
                        sx={{
                            width: '20px !important',
                            height: '20px !important',
                            '& .MuiCircularProgress-svg': {
                                color: props.variant === 'contained' || props.variant === undefined ? '#fff' : theme.color.red,
                            },
                        }}
                    />
                )}
            </Button>
        );
    };

    return !props.isBadge ? (
        <>
            {renderBtn()}
        </>
    ) : (
        <Badge
            badgeContent={props.badgeCount}
            color='secondary'
            sx={{
                '& .MuiBadge-invisible': {
                    transform: 'scale(1) translate(50%, -50%)',
                },
            }}
        >
            {renderBtn()}
        </Badge>
    );
});