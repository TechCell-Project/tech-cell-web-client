import { useState } from 'react';
import Link from 'next/link';

import { NavMenuProps } from './NavMenu';
import { RootPath } from '@/constants/enum';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    width: '100%',
    border: 'none',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
    '& .MuiAccordionSummary-root': {
        minHeight: 'auto',
        padding: 0,
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: 0,
    marginLeft: '40px',
    display: 'flex',
    flexDirection: 'column',
    '& a': {
        borderBottom: `1px solid ${theme.color.lightGray}`,
        padding: '5px 0',
    },
}));

const NavAccordion = ({ content, redirectLinks }: NavMenuProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                aria-controls='nav-content'
                id='nav-header'
                expandIcon={<ExpandMoreIcon />}
            >
                <Button startIcon={<PhoneAndroidOutlinedIcon />}>
                    <Typography variant='body1'>{content}</Typography>
                </Button>
            </AccordionSummary>
            <AccordionDetails>
                {redirectLinks.map((link) => (
                    <Link
                        key={link.value}
                        className='w-full'
                        href={`${RootPath.ProductList}?${link.searchQuery.toString()}`}
                    >
                        <Typography variant='body2'>{link.label}</Typography>
                    </Link>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export { NavAccordion };
