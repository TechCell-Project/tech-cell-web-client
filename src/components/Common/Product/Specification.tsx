import React, { memo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { AttributeDynamics } from '@models/Attribute';

import { getArrayAttributesByKey, upperCase } from '@/utils';
import Typography from '@mui/material/Typography';

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f3f4f7',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface TechnologyInformationProps {
    techInfo: AttributeDynamics[];
    isDialog?: boolean;
}

export const Specification = memo(({ techInfo, isDialog }: TechnologyInformationProps) => {
    const getTechInfo = (attributes: AttributeDynamics[], fieldsToRemove: string[]) => {
        return attributes.filter((attribute) => !fieldsToRemove.includes(attribute.k));
    };

    const info = getTechInfo(techInfo, [
        'brand',
        'brand_country',
        'model',
        'origin',
        'width',
        'height',
        'length',
    ]);

    const screenAttributes = getArrayAttributesByKey(info, 'screen');
    const frontCameraAttributes = getArrayAttributesByKey(screenAttributes.rest, 'front_camera');
    const rearCameraAttributes = getArrayAttributesByKey(frontCameraAttributes.rest, 'rear_camera');
    const cameraAttributes = getArrayAttributesByKey(rearCameraAttributes.rest, 'camera');
    const processorAttributes = getArrayAttributesByKey(cameraAttributes.rest, 'cpu');
    const graphicAttributes = getArrayAttributesByKey(processorAttributes.rest, 'gpu');
    const ramAttributes = getArrayAttributesByKey(graphicAttributes.rest, 'ram');
    const batteryAttributes = getArrayAttributesByKey(ramAttributes.rest, 'battery');
    const chargingAttributes = getArrayAttributesByKey(batteryAttributes.rest, 'charging');
    const simCardAttributes = getArrayAttributesByKey(chargingAttributes.rest, 'sim');
    const operatorAttributes = getArrayAttributesByKey(simCardAttributes.rest, 'operating');
    const connectivityAttributes = getArrayAttributesByKey(operatorAttributes.rest, 'connectivity');
    const dimensionAttributes = getArrayAttributesByKey(connectivityAttributes.rest, 'dimensions');
    const weightAttributes = getArrayAttributesByKey(dimensionAttributes.rest, 'weight');

    return isDialog ? (
        <>
            {screenAttributes.specifics.length > 0 && (
                <SpecificAttributeTable attributes={screenAttributes.specifics} title='Màn hình' />
            )}
            {rearCameraAttributes.specifics.length > 0 && (
                <SpecificAttributeTable
                    attributes={[...rearCameraAttributes.specifics, ...cameraAttributes.specifics]}
                    title='Camera sau'
                />
            )}
            {frontCameraAttributes.specifics.length > 0 && (
                <SpecificAttributeTable
                    attributes={frontCameraAttributes.specifics}
                    title='Camera trước'
                />
            )}
            {processorAttributes.specifics.length > 0 && (
                <SpecificAttributeTable
                    attributes={[...processorAttributes.specifics, ...graphicAttributes.specifics]}
                    title='Vi xử lý & đồ họa'
                />
            )}
            {ramAttributes.specifics.length > 0 && (
                <SpecificAttributeTable attributes={ramAttributes.specifics} title='Ram' />
            )}
            {batteryAttributes.specifics.length > 0 && (
                <SpecificAttributeTable
                    attributes={[...batteryAttributes.specifics, ...chargingAttributes.specifics]}
                    title='Pin & Công nghệ sạc'
                />
            )}
            {(connectivityAttributes.specifics.length > 0 ||
                simCardAttributes.specifics.length > 0 ||
                operatorAttributes.specifics.length > 0) && (
                <SpecificAttributeTable
                    attributes={[
                        ...simCardAttributes.specifics,
                        ...operatorAttributes.specifics,
                        ...connectivityAttributes.specifics,
                    ]}
                    title='Pin & Công nghệ sạc'
                />
            )}
            {dimensionAttributes.specifics.length > 0 && weightAttributes.specifics.length > 0 && (
                <SpecificAttributeTable
                    attributes={[...dimensionAttributes.specifics, ...weightAttributes.specifics]}
                    title='Thiết kế & Trọng lượng'
                />
            )}
            {weightAttributes.rest.length > 0 && (
                <SpecificAttributeTable
                    attributes={weightAttributes.rest}
                    title='Thông số & Tiện ích khác'
                />
            )}
        </>
    ) : (
        <Table>
            <TableBody>
                {info.map((attribute) => {
                    return (
                        <StyledTableRow key={attribute.k}>
                            <TableCell sx={{ textTransform: 'capitalize' }}>
                                {attribute.name}
                            </TableCell>
                            <TableCell>
                                {attribute.v} {attribute?.u && `(${attribute.u.toLowerCase()})`}
                            </TableCell>
                        </StyledTableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
});

Specification.displayName = 'Specification';

const SpecificAttributeTable = ({
    attributes,
    title,
}: {
    attributes: AttributeDynamics[];
    title: string;
}) => {
    return (
        <div className='flex flex-col w-full'>
            <Typography
                variant='h4'
                fontSize={{ sm: 16, xs: 14 }}
                fontWeight={600}
                sx={{ mt: '10px' }}
            >
                {title}
            </Typography>
            <Table sx={{ mt: '8px' }}>
                <TableBody>
                    {attributes.map((attribute) => {
                        return (
                            <StyledTableRow key={attribute.k}>
                                <TableCell sx={{ minWidth: '40%' }}>
                                    {upperCase(attribute.name)}
                                </TableCell>
                                <TableCell>
                                    {upperCase(attribute.v)}{' '}
                                    {attribute?.u && `(${attribute.u.toUpperCase()})`}
                                </TableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
