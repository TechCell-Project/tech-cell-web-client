import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { styled } from '@mui/material/styles';

import OrderItemCard from './OrderItemCard';
import { SkeletonCartItem } from '../Display/SkeletonCartItem';

import { useAppSelector } from '@/store/store';

import { buildAddressString, getSingleProductVariant } from '@/utils';
import { ORDER_STATUSES, PAYMENT_STATUSES, STATUS_PENDING } from '@/constants/contents';
import { VariantInCart } from '@/interfaces/cart';
import { RootPath } from '@/constants/enum';

const HeaderBox = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    '& p': {
        fontSize: '14px',
        fontWeight: 500,
    },
    [theme.breakpoints.up('sm')]: {
        padding: '15px 20px',
        '& p': {
            fontSize: '16px',
        },
    },
}));

const WhiteBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
        marginTop: '20px',
        '& p': {
            fontSize: '16px',
        },
    },
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
    marginTop: '10px',
    marginBottom: '24px',
}));

const IconContainer = styled(Box)(({ theme }) => ({
    padding: '10px',
    backgroundColor: theme.color.lightGray,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
        color: theme.color.gray,
        height: '26px',
        width: '26px',
    },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.color.red,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.color.red,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 4,
        border: 0,
        backgroundColor: theme.color.lightGray,
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.color.gray,
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: theme.color.red,
    }),
    ...(ownerState.completed && {
        backgroundColor: theme.color.red,
    }),
}));

const StepIconNormal = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <DesktopWindowsOutlinedIcon />,
        2: <ArchiveIcon />,
        3: <LocalShippingIcon />,
        4: <DoneAllIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
};

const steps = ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];

const OrderDetails = () => {
    const router = useRouter();
    const { order } = useAppSelector((state) => state.order);

    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);
    const [variants, setVariants] = useState<VariantInCart[]>([]);

    useEffect(() => {
        if (order) {
            const fetches = order.products.map((item) => getSingleProductVariant(item));
            Promise.all(fetches)
                .then((variants) => {
                    setVariants(variants);
                    setIsLoadingItems(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch product details:', error);
                    setIsLoadingItems(false);
                });
        }
    }, [order]);

    const handleClickItem = (slug: string) => {
        router.push(`${RootPath.ProductDetails}/${slug}`);
    };

    console.log(order);

    return (
        <Container maxWidth='lg' sx={{ marginTop: '20px', paddingBottom: '20px' }}>
            {/* Header OrderDetail */}

            <HeaderBox>
                <Button startIcon={<ArrowBackIosIcon />} onClick={() => router.back()}>
                    <Typography
                        variant='subtitle1'
                        sx={{
                            display: { sm: 'block', xs: 'none' },
                        }}
                    >
                        Quay lại
                    </Typography>
                </Button>
                <Box
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textTransform: 'uppercase',
                        textAlign: 'right',
                        '& span': {
                            color: '#ee4949',
                        },
                    }}
                >
                    <Typography>
                        Mã đơn hàng : <span>{order?._id}</span>
                    </Typography>
                </Box>
            </HeaderBox>

            {/* Body OrderDetail */}
            <WhiteBox
                sx={{
                    padding: '20px 24px',
                    '& p': {
                        fontSize: { sm: '16px', xs: '14px' },
                        fontWeight: 500,
                    },
                }}
            >
                <div className='w-full'>
                    <StyledStepper activeStep={1} alternativeLabel connector={<QontoConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={StepIconNormal}>{label}</StepLabel>
                            </Step>
                        ))}
                    </StyledStepper>
                </div>
                {order?.shippingOrder && (
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: { sm: '20px', xs: '16px' },
                                    mb: '20px',
                                }}
                            >
                                <IconContainer>
                                    <LocationOnIcon />
                                </IconContainer>
                                <div className='flex flex-col'>
                                    <Typography
                                        sx={{
                                            fontWeight: '600 !important',
                                        }}
                                    >
                                        Địa Chỉ Nhận Hàng:
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            padding: '6px 0px',
                                            '& p': {
                                                fontWeight: '400',
                                            },
                                            '& span': {
                                                fontWeight: '500',
                                            },
                                        }}
                                    >
                                        <Typography variant='body1'>
                                            Tên :{' '}
                                            <span>
                                                {order.shippingOrder.toAddress.customerName}
                                            </span>
                                        </Typography>
                                        <Typography variant='body1'>
                                            Số điện thoại :{' '}
                                            <span>
                                                {order.shippingOrder.toAddress.phoneNumbers}
                                            </span>
                                        </Typography>
                                        <Typography variant='body1'>
                                            Địa chỉ :{' '}
                                            <span>
                                                {buildAddressString(order.shippingOrder.toAddress)}
                                            </span>
                                        </Typography>
                                    </Box>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: { sm: '20px', xs: '16px' },
                                    mb: '20px',
                                }}
                            >
                                <IconContainer>
                                    <PaymentsIcon />
                                </IconContainer>
                                <div className='flex flex-col'>
                                    <Typography
                                        sx={{
                                            fontWeight: '600 !important',
                                        }}
                                    >
                                        Thanh toán:
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            padding: '6px 0px',
                                            '& p': {
                                                fontWeight: '400',
                                            },
                                            '& span': {
                                                fontWeight: '500',
                                            },
                                        }}
                                    >
                                        <Typography variant='body1'>
                                            Phương thức thanh toán:{' '}
                                            <span>
                                                {order.paymentOrder?.method !== 'COD'
                                                    ? order.paymentOrder?.method
                                                    : 'Thanh toán khi nhận hàng'}
                                            </span>
                                        </Typography>
                                        <Typography variant='body1'>
                                            Trạng thái:{' '}
                                            <span>
                                                {
                                                    PAYMENT_STATUSES.get(order.paymentOrder.status!)
                                                        ?.label
                                                }
                                            </span>
                                        </Typography>
                                    </Box>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </WhiteBox>

            {/* Footer OrderDetail */}
            <WhiteBox
                sx={{
                    padding: '10px 0',
                }}
            >
                {isLoadingItems &&
                    order?.products.map((item) => (
                        <SkeletonCartItem key={item.productId! + item.sku!} />
                    ))}
                {variants.map((variant) => (
                    <OrderItemCard
                        key={variant.id + variant.data.sku}
                        item={variant}
                        handleClick={handleClickItem}
                    />
                ))}
            </WhiteBox>
        </Container>
    );
};

export default OrderDetails;
