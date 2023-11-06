'use client';

import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../../styles/components/productdetail.module.scss';
import { VariationModel } from '@models/Product';
import { getSingleAttribute, sortByCustomOrder } from 'utils';
import { VariantInfo, VariantStorage } from '@interfaces/product';

interface ProductVariationProps {
    variations: VariationModel[];
    handleSelectVariant: (variant: VariantInfo) => void;
}

type ProductColor = {
    color: string;
    selectable: boolean;
    isSelected: boolean;
};

const ChooseProduct: FC<ProductVariationProps> = ({ variations, handleSelectVariant }) => {
    const variantInfoArray = variations.map((variant) => {
        const storageData = getSingleAttribute(variant.attributes, 'storage');
        const color = getSingleAttribute(variant.attributes, 'color').v;

        return {
            storage: storageData.v + ' ' + storageData.u.toUpperCase(),
            color: color[0].toUpperCase() + color.slice(1),
            images: variant.images,
            price: variant.price,
            stock: variant.stock,
        };
    });

    const storageArray: VariantStorage[] = variantInfoArray.map((item) => {
        return {
            storage: item.storage,
            outOfStock: item.stock === 0,
            price: item.price,
        };
    });

    function getUniqueStorage(arr: VariantStorage[]) {
        const seen: Record<string, boolean> = {}; // A temporary object to store seen objects
        const result: VariantStorage[] = []; // An array to store the unique objects

        for (const item of arr) {
            if (item.outOfStock) {
                result.push(item);
            } else {
                // Convert the object without considering outOfStock property to a string to use it as a key for the 'seen' object
                const key = JSON.stringify({ storage: item.storage });

                if (!seen[key]) {
                    result.push(item);
                    seen[key] = true;
                }
            }
        }

        return result;
    }

    const uniqueStorages = sortByCustomOrder(getUniqueStorage(storageArray));

    function getUniqueColor(arr: typeof variantInfoArray): ProductColor[] {
        const uniqueColors = new Set<string>();

        for (const item of arr) {
            uniqueColors.add(item.color);
        }

        return Array.from(uniqueColors).map((item) => {
            return {
                color: item,
                selectable: false,
                isSelected: false,
            };
        });
    }

    const defaultColorOpts = getUniqueColor(variantInfoArray);

    const handleSelectFirstValue = (arr: VariantStorage[]) => {
        let select = '';

        for (const element of arr) {
            if (element.outOfStock === false) {
                select = element.storage;
                break;
            }
        }

        return select;
    };

    // Xử lý click chọn dung lượng sản phẩm
    const [selectedStorage, setSelectedStorage] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<ProductColor[]>([]);

    useEffect(() => {
        setSelectedStorage(handleSelectFirstValue(uniqueStorages));
        setSelectedColor(defaultColorOpts);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variations]);

    const handleSelectStorage = (arr: string[]) => {
        return defaultColorOpts.map((color) => {
            if (arr.includes(color.color)) {
                return {
                    ...color,
                    selectable: true,
                };
            } else {
                return color;
            }
        });
    };

    useEffect(() => {
        const currentVariants = variantInfoArray
            .filter((item) => item.storage === selectedStorage)
            .map((item) => item.color);

        setSelectedColor(handleSelectStorage(currentVariants));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStorage]);

    const handleSelectColor = (color: string) => {
        const arr = selectedColor.map((item) => {
            if (item.color === color) {
                return {
                    ...item,
                    isSelected: true,
                };
            }
            return {
                ...item,
                isSelected: false,
            };
        });

        setSelectedColor(arr);
    };

    const getVariant = (storage: string, color?: string) => {
        return variantInfoArray
            .filter((variant) => {
                if (color !== undefined) {
                    return variant.storage === storage && variant.color === color;
                }
                return variant.storage === storage;
            })
            .shift();
    };

    useEffect(() => {
        const color = selectedColor.filter(item => item.isSelected).shift()?.color;
        const currentVariant = getVariant(selectedStorage, color);

        if (currentVariant !== undefined) {
            handleSelectVariant({
                storage: currentVariant.storage,
                color: currentVariant.color,
                price: currentVariant.price,
                isSelectedColor: color !== undefined,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStorage, selectedColor]);

    return (
        <>
            <div className={styles.product_internal_content}>
                <div className={styles.product_internal_name}>Chọn dung lượng sản phẩm</div>
                <div className={styles.product_internal_}>
                    {uniqueStorages.map((variant) => (
                        <div key={variant.storage}>
                            {variant.outOfStock ? (
                                <button disabled>
                                    <div className={styles.product_internal_text}>
                                        <p>{variant.storage}</p>
                                        <p>- Hết hàng -</p>
                                    </div>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={`${
                                        variant.storage === selectedStorage
                                            ? `${styles.activeInternal}`
                                            : ''
                                    }`}
                                    onClick={() => setSelectedStorage(variant.storage)}
                                >
                                    <div className={styles.product_internal_text}>
                                        <p>{variant.storage}</p>
                                        <p>{variant.price.sale}</p>
                                    </div>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.product_options_content}>
                <div className={styles.product_option_name}>Chọn màu để xem giá </div>
                <div className={styles.product_potions}>
                    {selectedColor.map((color) => {
                        const currentVariant = getVariant(selectedStorage, color.color);
                        const variantImage = currentVariant?.images.filter(image => image.isThumbnail).shift();

                        return (
                            <div key={color.color}>
                                <button
                                    type="button"
                                    className={color.isSelected ? styles.activecolor : ''}
                                    disabled={!color.selectable}
                                    onClick={() => handleSelectColor(color.color)}
                                >
                                    <div className={styles.product_option_block}>
                                        {variantImage !== undefined && (
                                            <Image
                                                src={variantImage.url}
                                                width={30}
                                                height={30}
                                                alt=""
                                            />
                                        )}
                                        <div className={styles.product_option_content_text}>
                                            <p>{color.color}</p>
                                            <p>
                                                {currentVariant !== undefined
                                                    ? currentVariant.price.sale
                                                    : ''}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ChooseProduct;
