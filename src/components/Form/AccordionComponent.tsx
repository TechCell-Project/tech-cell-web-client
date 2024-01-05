import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import styles from '@styles/components/accordion.module.scss';

interface Props {
    content: string;
    options?: any[];
    icon?: React.ReactNode;
}

export const AccordionComponent = (props: Props) => {
    return (
        <>
            <Accordion
                sx={{
                    boxShadow: 'unset !important',
                    '&.Mui-expanded': {
                        m: 0,
                    },
                    '&::before': {
                        display: 'none',
                        position: 'unset !important',
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                        padding: '10px 0',
                        '& .MuiAccordionSummary-content': {
                            m: '0px !important',
                            gap: '20px',
                        },
                    }}
                >
                    {props.icon && props.icon}
                    <Typography fontSize='15px' fontWeight={500}>
                        {props.content}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: '230px', overflow: 'auto' }}>
                    {props.options &&
                        props.options.map((item, i) => (
                            <Link href={item?.to} key={i} className={styles.accordion_link}>
                                • {item.label}
                            </Link>
                        ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
};
