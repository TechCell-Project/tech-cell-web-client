import React from 'react';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Service = styled(Paper)(() => ({
    backgroundColor: 'rgba(238, 73, 73, 0.2)',
    border: '3px solid rgba(238, 73, 73, 0.4)',
    height: '100px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    gap: '10px',
    h6: {
        fontSize: '16px',
    },
    p: {
        fontSize: '14px',
    },
    svg: {
        fontSize: 40,
        color: 'rgba(238, 73, 73, 0.6)',
    },
    transition: '.5s',
    '&:hover': {
        border: '3px solid #ee4949',
        svg: {
            color: '#ee4949',
        },
    },
}));

export const ShopServicesComponent = () => {
    return (
        <Box sx={{ margin: '20px 0px', display: 'flex', justifyContent: 'center' }}>
            <Grid
                container
                spacing={3}
                rowSpacing={1}
                left={0}
                sx={{
                    width: { xs: '390px', lg: '1200px', sm: '768px', md: '960px' },
                    justifyContent: 'space-between',
                }}
            >
                <Grid item xs={12} lg={3} sm={6} md={4}>
                    <Service square elevation={0}>
                        <LocalShippingIcon />
                        <div>
                            <h6>Free Shipping</h6>
                            <p>
                                Cho mọi đơn hàng
                                <br />
                                từ 2 triệu
                            </p>
                        </div>
                    </Service>
                </Grid>
                <Grid item xs={12} lg={3} sm={6} md={4}>
                    <Service square elevation={0}>
                        <DiscountIcon />
                        <div>
                            <h6>
                                Ưu đãi bất ngờ
                                <br />
                                mỗi tuần
                            </h6>
                            <p>Giảm tới 25%</p>
                        </div>
                    </Service>
                </Grid>
                <Grid item xs={12} lg={3} sm={6} md={4}>
                    <Service square elevation={0}>
                        <HeadsetMicIcon />
                        <div>
                            <h6>Support 24/7</h6>
                            <p>
                                Hỗ trợ khách hàng
                                <br />
                                mọi lúc
                            </p>
                        </div>
                    </Service>
                </Grid>
                <Grid item xs={12} lg={3} sm={6} md={4}>
                    <Service square elevation={0}>
                        <MonetizationOnIcon />
                        <div>
                            <h6>Mức giá ưu đãi</h6>
                            <p>
                                Giá thành vô cùng
                                <br />
                                cạnh tranh
                            </p>
                        </div>
                    </Service>
                </Grid>
            </Grid>
        </Box>
    );
};