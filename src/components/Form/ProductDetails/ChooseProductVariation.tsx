import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../../styles/components/productdetail.module.scss';
import { VariationModel } from '@models/Product';
import { AttributeDynamics } from '@models/Attribute';
import { getUniqueAttributeKeys } from 'utils/funcs';
import { useSkipFirstRender } from '@hooks/useSkipFirstRender';

interface ProductVariationProps {
    variations: VariationModel[];
    handleSelectVariation: (sku: string | null) => void;
}

function ChooseProductVariation({
    variations,
    handleSelectVariation,
}: Readonly<ProductVariationProps>) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, AttributeDynamics>>(
        {},
    );
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

    // Get the keys of the attribute groups in the order they appear in the product
    const attributeKeys = getUniqueAttributeKeys(variations);

    // Group attributes by their keys
    const groupedAttributes = variations.reduce((grouped, variation) => {
        variation.attributes.forEach((attribute) => {
            grouped[attribute.k] = grouped[attribute.k] || new Map();
            grouped[attribute.k].set(attribute.v, attribute);
        });
        return grouped;
    }, {} as Record<string, Map<string, AttributeDynamics>>);

    // const attributeAmountNeedToSelect = Object.entries(groupedAttributes).length;

    useEffect(() => {
        if (Object.entries(selectedAttributes).length === 0) {
            const firstRecord = Object.entries(groupedAttributes).shift();

            const firstMap = firstRecord?.find((element) => typeof element === 'object') as Map<
                string,
                AttributeDynamics
            >;

            if (firstMap) {
                const firstAttribute = Array.from(firstMap.values()).shift() as AttributeDynamics;
                setSelectedAttributes({ [firstAttribute.k]: firstAttribute });
            }
        }
    }, [groupedAttributes, selectedAttributes]);

    const handleAttributeSelection = (attribute: AttributeDynamics) => {
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

    useSkipFirstRender(() => {
        handleSelectVariation(selectedVariation);
    }, [selectedVariation, handleSelectVariation]);

    useEffect(() => {
        // Check if all the attribute groups have a selected attribute
        if (attributeKeys.every((key) => key in selectedAttributes)) {
            const matchingVariation = variations.find((variation) =>
                variation.attributes.every(
                    (attribute) => selectedAttributes[attribute.k]?.v === attribute.v,
                ),
            );
            console.log(matchingVariation);
            setSelectedVariation(matchingVariation?.sku ?? null);
        }
    }, [selectedAttributes, variations, attributeKeys]);

    // Uppercase first letter
    const upperCaseF = (name: string) => {
        return name[0].toUpperCase() + name.slice(1);
    };

    return (
        <div className={styles.product_internal_content}>
            {Object.entries(groupedAttributes).map(([key, attributes], index) => (
                <Fragment key={key}>
                    {/* Display the name of the first attribute in the current group */}
                    <div className={styles.product_internal_name}>
                        {upperCaseF(Array.from(attributes.values())[0].name)}
                    </div>
                    <div className={styles.product_internal_}>
                        {Array.from(attributes.values()).map((attribute) => {
                            const selectedAttributesForOtherKeys = Object.entries(
                                selectedAttributes,
                            )
                                .filter(([selectedKey]) => selectedKey !== key)
                                .reduce((obj, [selectedKey, selectedAttribute]) => {
                                    obj[selectedKey] = selectedAttribute;
                                    return obj;
                                }, {} as Record<string, AttributeDynamics>);

                            const variationsWithSelectedAttributesForOtherKeys = variations.filter(
                                (variation) =>
                                    Object.values(selectedAttributesForOtherKeys).every(
                                        (selectedAttribute) =>
                                            variation.attributes.some(
                                                (variationAttribute) =>
                                                    variationAttribute.k === selectedAttribute.k &&
                                                    variationAttribute.v === selectedAttribute.v,
                                            ),
                                    ),
                            );

                            const variantThumbnail =
                                index === 0
                                    ? variations
                                          .find((variation) =>
                                              variation.attributes.find(
                                                  (attr) =>
                                                      attr.k === attribute.k &&
                                                      attr.v === attribute.v,
                                              ),
                                          )
                                          ?.images.find((image) => image.isThumbnail)
                                    : undefined;

                            console.log(variantThumbnail);

                            const isAttributeInVariations =
                                variationsWithSelectedAttributesForOtherKeys.some((variation) =>
                                    variation.attributes.some(
                                        (variationAttribute) =>
                                            variationAttribute.k === attribute.k &&
                                            variationAttribute.v === attribute.v,
                                    ),
                                );

                            const isSelected = selectedAttributes[attribute.k]?.v === attribute.v;

                            const isSelectable = index === 0 ? true : !!isAttributeInVariations;

                            let classNameOfButton = isSelected ? styles.activeInternal : '';
                            classNameOfButton += !isSelectable ? ' ' + styles.blurInternal : '';

                            return (
                                <button
                                    key={attribute.v}
                                    type="button"
                                    onClick={() => handleAttributeSelection(attribute)}
                                    className={classNameOfButton}
                                    disabled={!isSelectable}
                                >
                                    <div className={styles.product_internal_block}>
                                        <div className={styles.product_internal_text}>
                                            <p>{upperCaseF(attribute.v)}{' '}{attribute.u}</p>
                                            <p>{' '}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

export default ChooseProductVariation;
