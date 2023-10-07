'use client';

import React, { useState, SyntheticEvent, useRef, useEffect, KeyboardEvent } from 'react';
import { KeyboardArrowRight } from '@mui/icons-material';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useTheme } from '@mui/material';
import { CategorySelecting } from '@interfaces/product';

interface Props {
    title: string;
    categories: Array<{
        key: string;
        value: string;
        chosen: boolean;
    }>;
    handleSelectCategory: (cat: CategorySelecting[]) => void;
}

const FilterCard = (props: Props) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selected, setSelected] = useState(props.categories);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handlePassValue = (arrayObj: typeof props.categories) => {
        const arraySelected: string[] = [];
        arrayObj.forEach((item) => {
            if (item.chosen) {
                arraySelected.push(item.value);
            }
        });
        return arraySelected;
    };

    const handleSelect = (event: any, choose: boolean) => {
        const {
            currentTarget: { value },
        } = event;
        setSelected(
            selected.map((item) => {
                if (item.key === value) {
                    return { ...item, chosen: !choose };
                } else {
                    return item;
                }
            }),
        );
    };

    useEffect(() => {
        //const selectedCat: string[] = handlePassValue(selected);
        props.handleSelectCategory(selected);
    }, [selected]);

    return (
        <>
            <Box marginRight="10px">
                <Button
                    endIcon={<KeyboardArrowRight />}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    sx={{
                        lineHeight: '1.5',
                        alignItems: 'center',
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '5px 10px',
                        marginBottom: '10px',
                        height: '34px',
                        fontSize: '12px',
                        color: 'black',
                        ...(open && {
                            '& .MuiButton-endIcon': {
                                transform: 'rotate(90deg)',
                            },
                        }),
                    }}
                >
                    {props.title}
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                >
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            padding: '10px',
                                            width: '350px',
                                        }}
                                    >
                                        {selected.map((item) => (
                                            <MenuItem
                                                key={item.key}
                                                sx={{ display: '', margin: 0, padding: 0 }}
                                            >
                                                <Button
                                                    value={item.key}
                                                    sx={{
                                                        position: 'relative',
                                                        display: 'flex',
                                                        backgroundColor: '#f3f4f6 !important',
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '10px',
                                                        color: '#444',
                                                        fontSize: '12px',
                                                        height: '34px',
                                                        margin: '0 10px 10px 0',
                                                        padding: '5px 10px',
                                                        whiteSpace: 'nowrap',
                                                        ...(item.chosen === true && {
                                                            backgroundColor: '#fef2f2 !important',
                                                            border: `1px solid ${theme.color.red} !important`,
                                                            color: theme.color.red + '!important',
                                                        }),
                                                    }}
                                                    onClick={(event) =>
                                                        handleSelect(event, item.chosen)
                                                    }
                                                >
                                                    {item.value}
                                                </Button>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Box>
        </>
    );
};

export default FilterCard;
