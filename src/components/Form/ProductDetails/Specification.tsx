import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AttributeDynamics } from '@models/Attribute';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f3f4f7',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface TechnologyInformation {
    techInfo: AttributeDynamics[];
}

export const Specification: FC<TechnologyInformation> = ({ techInfo }) => {
    const getTechInfo = (attributes: AttributeDynamics[], fieldsToRemove: string[]) => {
        return attributes.filter((attribute) => !fieldsToRemove.includes(attribute.k));
    };

    const info = getTechInfo(techInfo, ['brand', 'brand_country', 'model', 'origin']);

    return (
        <Table>
            <TableBody>
                {info.map((attribute) => {
                    const name = attribute.name[0].toUpperCase() + attribute.name.slice(1);

                    return (
                        <StyledTableRow key={attribute.k}>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                {attribute.v} {attribute?.u && `(${attribute.u.toLowerCase()})`}
                            </TableCell>
                        </StyledTableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
