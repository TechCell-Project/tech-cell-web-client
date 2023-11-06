import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';

interface Props {
    content: string;
    options?: any[];
    icon?: React.ReactNode;
}

export const AccordionComponent = (props: Props) => {
    return (
        <>
            {props.icon && props.icon}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        border:'1px solid #ee4949',
                        borderRadius:'5px'
                    }}
                >
                    <Typography sx={{boxShadow:'none', color: '#ee4949' }}>{props.content}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {props.options &&
                        props.options.map((item, i) => (
                            <Box key={i} sx={{
                                marginTop: '10px',
                            }}>
                                <Link
                                    sx={{
                                        textDecoration: 'none',
                                        color: '#ee4949',
                                        fontSize:'13px'
                                    }}
                                    href={item.to}
                                >
                                    {item.label}
                                </Link>
                            </Box>
                        ))}
                </AccordionDetails>
            </Accordion>
        </>
    );
};
