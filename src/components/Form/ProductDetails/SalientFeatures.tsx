import React, { memo, useState } from 'react';
import styles from '@styles/components/productdetail.module.scss';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { CommonBtn } from '@components/Common';
import Stack from '@mui/system/Stack';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Typography from '@mui/material/Typography';

export const SalientFeatures = memo(({ content }: { content: string }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <Box className={styles.card_content_left} sx={{ position: 'relative', height: 'auto' }}>
            <Box className={styles.card_body_left}>
                <Typography fontWeight={600} fontSize='16px' sx={{ mb: 3 }}>
                    Đặc điểm chi tiết, nổi bật
                </Typography>
                <Box
                    className={`${styles.card_body_title} ${collapse ? `${styles.expanded}` : ''}`}
                >
                    <Collapse in={collapse} collapsedSize={100}>
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </Collapse>
                </Box>
                <Stack direction='row' justifyContent='center' mt={4}>
                    <CommonBtn
                        content={collapse ? 'Thu lại' : 'Xem thêm'}
                        endIcon={
                            collapse ? (
                                <KeyboardArrowUpRoundedIcon />
                            ) : (
                                <KeyboardArrowDownRoundedIcon />
                            )
                        }
                        handleClick={() => setCollapse((prev) => !prev)}
                        variant='text'
                    />
                </Stack>
            </Box>
        </Box>
    );
});
