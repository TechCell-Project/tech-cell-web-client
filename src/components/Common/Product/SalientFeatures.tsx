import React, { memo, useState } from 'react';

import styles from '@/styles/components/productdetail.module.scss';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { CommonBtn } from '@components/Common';
import ScrollLink from '../ScrollLink';

export const SalientFeatures = memo(({ content }: { content: string }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <Box
            className={styles.card_content_left}
            sx={{ position: 'relative', padding: '16px 20px' }}
        >
            <Box className={styles.card_body_left}>
                <Typography fontWeight={600} fontSize={{ sm: 16, xs: 14 }} sx={{ mb: 3 }}>
                    Đặc điểm chi tiết, nổi bật
                </Typography>
                <Box
                    className={`${styles.card_body_title}` + collapse ? ` ${styles.expanded}` : ''}
                    id='description-top'
                >
                    <Collapse
                        in={collapse}
                        collapsedSize={100}
                        sx={{ '& p:has(em)': { display: 'flex', justifyContent: 'center' } }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </Collapse>
                </Box>
                <Stack direction='row' justifyContent='center' mt={4}>
                    <ScrollLink href={collapse ? '#description-top' : '#specification-btn'}>
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
                    </ScrollLink>
                </Stack>
            </Box>
        </Box>
    );
});

SalientFeatures.displayName = 'ProductDescription';
