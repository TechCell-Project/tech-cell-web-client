'use client';

import React, { useEffect, useState } from 'react';

import { AttributeDynamics, VariationModel } from '@/models';

import { getUniqueAttributeKeys, upperCase } from '@/utils/funcs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const AttributesContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '10px',
    [theme.breakpoints.up('sm')]: {
        gap: '20px',
    },
    '& .btn-selected': {
        color: theme.color.red,
        border: `1px solid ${theme.color.red}`,
        backgroundColor: theme.color.lightRed,
    },
    '& .Mui-disabled': {
        borderColor: `${theme.color.lightBlack} !important`,
        '& .MuiTypography-body1': {
            color: `${theme.color.gray} !important`,
        },
    },
}));

const AttributeButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    padding: '8px 18px',
    borderRadius: '5px',
    color: theme.color.black,
    borderColor: theme.color.gray,
    transition: 'all .25s ease',
    '&:hover': {
        color: theme.color.red,
    },
}));

interface SelectProductVariationProps {
    variations: VariationModel[];
    handleSelectVariationSku: (sku: string | null) => void;
    handleSelectColorAttribute?: (index: number) => void;
}

export const SelectProductVariation = ({
    variations,
    handleSelectVariationSku,
    handleSelectColorAttribute,
}: SelectProductVariationProps) => {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, AttributeDynamics>>(
        {},
    );
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

    // Get the keys of the attribute groups in the product variation
    const attributeKeys = getUniqueAttributeKeys(variations);

    // Group attributes by their keys
    const extractAttributeMaps = (variations: VariationModel[]) => {
        const attributeMaps: Record<string, Map<string, AttributeDynamics>> = {};

        for (const variation of variations) {
            for (const attribute of variation.attributes) {
                // Initialize the map for the attribute key if it doesn't exist
                if (!attributeMaps[attribute.k]) {
                    attributeMaps[attribute.k] = new Map();
                }

                // Add the attribute value and its details to the map
                attributeMaps[attribute.k].set(attribute.v.toLowerCase(), attribute);
            }
        }

        return attributeMaps;
    };

    // handle selecting attribute
    const handleAttributeSelection = (attribute: AttributeDynamics) => {
        // do nothing if select same attributes values
        if (attribute.k in selectedAttributes && selectedAttributes[attribute.k] === attribute) {
            return;
        }
        setSelectedAttributes((prevState) => {
            const newState = { ...prevState, [attribute.k]: attribute };

            // Find the index of the current attribute group
            const currentIndex = attributeKeys.indexOf(attribute.k);

            // Remove the selections of the subsequent attribute groups
            for (let i = currentIndex + 1; i < attributeKeys.length; i++) {
                delete newState[attributeKeys[i]];
                setSelectedVariation(null);
            }

            return newState;
        });
    };

    const getAttributeName = (map: Map<string, AttributeDynamics>) => {
        return upperCase(Array.from(map.values())[0].name);
    };

    // check if an attribute is contained in a variation
    const isAttributeInVariation = (variation: VariationModel, attribute: AttributeDynamics) => {
        return variation.attributes.some(
            (attr) => attr.k === attribute.k && attr.v.toLowerCase() === attribute.v.toLowerCase(),
        );
    };

    // get the variations that have the current attributes
    const getOtherAttributesVariations = (key: string) => {
        // get other attributes in selectedAttributes except for current key
        const otherAttributes = Object.entries(selectedAttributes).filter(
            ([selectedKey]) => selectedKey !== key,
        );

        const variationsMatchedWithOtherAttributes = variations.filter((variation) =>
            otherAttributes.every(([, otherAttribute]) =>
                isAttributeInVariation(variation, otherAttribute),
            ),
        );
        return variationsMatchedWithOtherAttributes;
    };

    const attributeMaps = Object.entries(extractAttributeMaps(variations));

    if (Object.entries(selectedAttributes).length === 0) {
        // get first attribute from first key of the map
        // const firstAttribute = Array.from(attributeMaps[0][1].values())[0]; -- way 1
        // -- way 2
        const firstAttribute = variations[0].attributes[0];
        setSelectedAttributes({ [firstAttribute.k]: firstAttribute });
    }

    useEffect(() => {
        // Check if all the attribute groups have a selected attribute
        if (attributeKeys.every((key) => key in selectedAttributes)) {
            const matchingVariation = variations.find((variation) =>
                variation.attributes.every(
                    (attribute) => selectedAttributes[attribute.k]?.v === attribute.v,
                ),
            )!;
            setSelectedVariation(matchingVariation.sku);
        }
    }, [selectedAttributes, variations, attributeKeys]);

    useEffect(() => {
        handleSelectVariationSku(selectedVariation);
    }, [selectedVariation, handleSelectVariationSku]);

    return (
        <div className='flex flex-col w-full'>
            {attributeMaps.map(([key, attributes], index) => (
                <Box
                    key={key}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginBottom: '16px',
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{ fontSize: { sm: '16px', xs: '14px' }, fontWeight: 600 }}
                    >
                        {getAttributeName(attributes)}
                    </Typography>
                    <AttributesContainer>
                        {Array.from(attributes.values()).map((attribute, attrIndex) => {
                            let attributeName = attribute.v;
                            if (attribute.u) {
                                attributeName += ' ' + attribute.u.toUpperCase();
                            }

                            // if this attribute is selected
                            const isSelected =
                                selectedAttributes[attribute.k]?.v.toLowerCase() ===
                                attribute.v.toLowerCase();

                            let isSelectable = false;

                            if (index === 0) {
                                // we can select any thing at first row
                                isSelectable = true;
                            } else if (index <= Object.entries(selectedAttributes).length) {
                                // get variations available with current selected attributes and this attribute key
                                const availableVariations = getOtherAttributesVariations(
                                    attribute.k,
                                );
                                // check if this attribute appears in available variations
                                isSelectable = availableVariations.some((variation) =>
                                    isAttributeInVariation(variation, attribute),
                                );
                            }

                            const onSelectAttribute = () => {
                                if (attribute.k === 'color' && handleSelectColorAttribute) {
                                    handleSelectColorAttribute(attrIndex);
                                    handleAttributeSelection(attribute);
                                } else {
                                    handleAttributeSelection(attribute);
                                }
                            };

                            return (
                                <AttributeButton
                                    key={attribute.k + '-' + attribute.v}
                                    variant='outlined'
                                    onClick={() => onSelectAttribute()}
                                    className={isSelected ? 'btn-selected' : ''}
                                    disabled={!isSelectable}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{ fontSize: '14px', fontWeight: 600 }}
                                    >
                                        {attributeName}
                                    </Typography>
                                </AttributeButton>
                            );
                        })}
                    </AttributesContainer>
                </Box>
            ))}
        </div>
    );
};
