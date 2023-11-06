import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { styled } from '@mui/material';
import React from 'react';
import { LocalShipping } from '@mui/icons-material';
import { Discount } from '@mui/icons-material';
import { HeadsetMic } from '@mui/icons-material';
import { MonetizationOn } from '@mui/icons-material';

const Service = styled(Paper)(() => ({
    backgroundColor: 'lightGray',
    border: '3px solid lightGray',
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
        color: 'gray',
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
                        <LocalShipping />
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
                        <Discount />
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
                        <HeadsetMic />
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
                        <MonetizationOn />
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
