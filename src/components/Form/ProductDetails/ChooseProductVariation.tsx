import React, { Fragment, useState, useEffect } from 'react';
import styles from '../../../styles/components/productdetail.module.scss';
import { ProductModel } from '@models/Product';
import { AttributeDynamics } from '@models/Attribute';

interface ProductVariationProps {
    product: ProductModel;
    handleSelectVariation: (sku: string) => void;
}

function ChooseProductVariation({
    product,
    handleSelectVariation,
}: Readonly<ProductVariationProps>) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, AttributeDynamics>>(
        {},
    );
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

    // Function to get unique attribute keys from all variations
    const getUniqueAttributeKeys = (product: ProductModel) =>
        Array.from(
            new Set(
                product.variations.flatMap((variation) =>
                    variation.attributes.map((attr) => attr.k),
                ),
            ),
        );

    const handleAttributeSelection = (attribute: AttributeDynamics) => {
        setSelectedAttributes((prevState) => {
            const newState = { ...prevState, [attribute.k]: attribute };

            // Get the keys of the attribute groups in the order they appear in the product
            const attributeKeys = getUniqueAttributeKeys(product);

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

    useEffect(() => {
        if (selectedVariation) {
            handleSelectVariation(selectedVariation);
        }
    }, [selectedVariation, handleSelectVariation]);

    useEffect(() => {
        // Get the keys of the attribute groups
        const attributeKeys = getUniqueAttributeKeys(product);

        // Check if all the attribute groups have a selected attribute
        if (attributeKeys.every((key) => key in selectedAttributes)) {
            const matchingVariation = product.variations.find((variation) =>
                variation.attributes.every(
                    (attribute) => selectedAttributes[attribute.k]?.v === attribute.v,
                ),
            );
            setSelectedVariation(matchingVariation?.sku ?? null);
        }
    }, [selectedAttributes, product]);

    // Group attributes by their keys
    const groupedAttributes = product.variations.reduce((grouped, variation) => {
        variation.attributes.forEach((attribute) => {
            grouped[attribute.k] = grouped[attribute.k] || new Map();
            grouped[attribute.k].set(attribute.v, attribute);
        });
        return grouped;
    }, {} as Record<string, Map<string, AttributeDynamics>>);

    return (
        <div className={styles.product_internal_content}>
            {Object.entries(groupedAttributes).map(([key, attributes]) => (
                <Fragment key={key}>
                    {/* Display the name of the first attribute in the current group */}
                    <div className={styles.product_internal_name}>
                        {Array.from(attributes.values())[0].name}
                    </div>
                    <div className={styles.product_internal_}>
                        {Array.from(attributes.values()).map((attribute) => {
                            // Create a new object that contains all the selected attributes except the current one
                            const selectedAttributesForOtherKeys = Object.entries(
                                selectedAttributes,
                            )
                                .filter(([selectedKey]) => selectedKey !== key)
                                .reduce((obj, [selectedKey, selectedAttribute]) => {
                                    obj[selectedKey] = selectedAttribute;
                                    return obj;
                                }, {} as Record<string, AttributeDynamics>);

                            // Filter the product variations to only include those that have all the selected attributes
                            const variationsWithSelectedAttributesForOtherKeys =
                                product.variations.filter((variation) =>
                                    Object.values(selectedAttributesForOtherKeys).every(
                                        (selectedAttribute) =>
                                            variation.attributes.some(
                                                (variationAttribute) =>
                                                    variationAttribute.k === selectedAttribute.k &&
                                                    variationAttribute.v === selectedAttribute.v,
                                            ),
                                    ),
                                );

                            // Check if the current attribute is in the selected variations
                            const isAttributeInVariations =
                                variationsWithSelectedAttributesForOtherKeys.some((variation) =>
                                    variation.attributes.some(
                                        (variationAttribute) =>
                                            variationAttribute.k === attribute.k &&
                                            variationAttribute.v === attribute.v,
                                    ),
                                );
                            const isSelected = selectedAttributes[attribute.k]?.v === attribute.v;

                            let classNameOfButton = isSelected ? styles.activeInternal : '';
                            classNameOfButton += !isAttributeInVariations
                                ? ' ' + styles.blurInternal
                                : '';

                            return (
                                <button
                                    key={attribute.v}
                                    type="button"
                                    onClick={() => handleAttributeSelection(attribute)}
                                    className={classNameOfButton}
                                >
                                    <div className={styles.product_option_block}>
                                        {attribute.v} {attribute.u}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Fragment>
            ))}
            {/* {selectedVariation && <div>Selected SKU: {selectedVariation}</div>} */}
        </div>
    );
}

export default ChooseProductVariation;
