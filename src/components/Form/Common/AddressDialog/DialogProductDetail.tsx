'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '@styles/components/modal.module.scss';
import { Table } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';

interface Props {
    isOpen: boolean;
    handleClose: () => void;
}
export const DialogProdutDetail = (props: Props) => {
    return (
        <>
            <Dialog
                className={styles.dialog_content}
                // onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.isOpen}
            >
                <DialogTitle className={styles.dialogtitle_h6}>
                    <Typography variant="h6">Thông số kĩ thuật</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={styles.dialog_table}>
                        <Table>
                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels6.7 inch, Super
                                    Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Màn hình</TableCell>
                                <TableCell>
                                    6.7 inch, Super Retina XDR, 2796 x 1290 Pixels
                                </TableCell>
                            </TableRow>
                        </Table>
                    </div>
                </DialogContent>
                <DialogActions className={styles.button_container}>
                    <Button className={styles.button_btn} onClick={props.handleClose}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
