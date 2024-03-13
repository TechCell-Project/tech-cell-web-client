'use client';

import React, { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

interface IDialog {
    isOpen: boolean;
    handleClose: (event?: any) => void;
    handleSubmit?: (event: any) => void | (({ ...e }) => Promise<void>);
    dialogTitle: string;
    dialogStyle?: any;
    dialogDesc?: string | React.ReactNode;
    children: React.ReactNode;
    isSmall: boolean;
}

function ShowDialogWithoutMemo(props: Readonly<IDialog>) {
    const theme = useTheme();

    const handleCloseDialog = (_: React.SyntheticEvent<Element, Event>, reason: string) => {
        if (reason && reason === 'backdropClick') {
            return;
        }
        props.handleClose();
    };

    return (
        <Dialog
            open={props.isOpen}
            keepMounted
            fullWidth={true}
            maxWidth={'sm'}
            onClose={handleCloseDialog}
            aria-describedby='dialog-description'
            sx={{
                minWidth: { sm: '560px' },
                '& .MuiPaper-root': {
                    margin: { sm: '32px', xs: '15px' },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: { xs: '10px 10px', sm: '10px 20px' },
                }}
            >
                <Stack
                    flexDirection='row'
                    gap={2}
                    sx={{
                        justifyContent: props.isSmall ? 'center' : 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    {!props.isSmall && <ErrorOutlineOutlinedIcon sx={{ fill: theme.color.red }} />}
                    <Typography
                        variant='body1'
                        fontWeight={600}
                        fontSize='17px'
                        color={theme.color.red}
                    >
                        {props.dialogTitle}
                    </Typography>
                </Stack>
                <IconButton
                    onClick={props.handleClose}
                    aria-label='close'
                    sx={{ fill: theme.color.black, padding: 0 }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            {props.dialogDesc && (
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        {props.dialogDesc}
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions
                sx={{
                    padding: '0 10px 15px 10px',
                    margin: '0',
                }}
            >
                {props.children}
            </DialogActions>
        </Dialog>
    );
}

export const ShowDialog = memo(ShowDialogWithoutMemo);
