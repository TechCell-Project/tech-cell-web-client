import React, { FC } from 'react';
import { Table } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AttributeDynamics } from '@models/Attribute';

interface TechnologyInformation {
    techInfo: AttributeDynamics[];
}

export const Specification: FC<TechnologyInformation> = ({ techInfo }) => {

    const getTechInfo = (attributes: AttributeDynamics[], fieldsToRemove: string[]) => {
        return attributes.filter(attribute => !fieldsToRemove.includes(attribute.k));
    }

    const info = getTechInfo(techInfo, ['brand', 'brand_country', 'model', 'origin']);

    console.log(info);

    return (
        <>
            <Table>
                {info.map(attribute => {
                    const name = attribute.name[0].toUpperCase() + attribute.name.slice(1);

                    return (
                    <TableRow key={attribute.k}>
                        <TableCell>{name}</TableCell>
                        <TableCell>
                            {attribute.v}
                        </TableCell>
                    </TableRow>
                )})}
            </Table>
        </>
    );
};
