import React, { FC, useState } from 'react';
import styles from '../../../styles/components/productdetail.module.scss';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { FormControlLabel } from '@mui/material';

interface DescriptionProps {
    content: string,
}

export const SalientFeatures: FC<DescriptionProps> = ({ content }) => {
    const [collapse, setCollapse] = useState(false);

    const handleChange = () => {
        setCollapse((prev) => !prev);
    };

    return (
        <>
            <Box className={styles.card_content_left} sx={{ position: 'relative', height: 'auto', }}>
                <Box className={styles.card_body_left}>
                    <Box
                        className={`${styles.card_body_title} ${
                            collapse ? `${styles.expanded}` : ''
                        }`}
                    >
                        <Collapse in={collapse} collapsedSize={100}>
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </Collapse>
                    </Box>

                    <div className={styles.card_btn}>
                        <button onClick={handleChange}>Xem Thêm</button>
                    </div>
                </Box>
            </Box>
        </>
    );
};
