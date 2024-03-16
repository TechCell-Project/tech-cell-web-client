'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
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
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { styled } from '@mui/material/styles';

import OrderItemCard from './OrderItemCard';
import { SkeletonCartItem } from '../Display/SkeletonCartItem';
import { ShowDialog } from '../Display/DialogCustom';
import { CommonBtn } from '../FormGroup/CommonBtn';
import { TextFieldCustom } from '../FormFormik';

import { useAppDispatch } from '@/store/store';
import { cancelAnOrder, getOrder, newPaymentUrl } from '@/store/slices/orderSlice';

import { buildAddressString, currencyFormat, debounce, getSingleProductVariant } from '@/utils';
import {
    ORDER_STATUSES,
    PAYMENT_STATUSES,
    STATUS_CANCELLED,
    STATUS_COMPLETED,
    STATUS_PENDING,
    STATUS_PROCESSING,
    STATUS_SHIPPING,
    STATUS_WAIT_FOR_PAYMENT,
} from '@/constants/contents';
import { RootPath } from '@/constants/enum';
import { VariantInCart } from '@/interfaces/cart';

import { OrderSchemaDTO, PaymentOrderDTO } from '@TechCell-Project/tech-cell-server-node-sdk';

import { Form, Formik } from 'formik';
import { CancelOrderReasonValidateSchema } from '@/validate/auth.validate';

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
    padding: '12px',
    '& h4': {
        fontSize: '16px',
        fontWeight: 600,
        marginBottom: '10px',
        textTransform: 'uppercase',
    },
    '& p, span': {
        fontSize: '14px',
        fontWeight: 500,
    },
    '& .MuiTypography-body1': {
        fontWeight: 400,
        fontSize: '14px',
    },
    [theme.breakpoints.up('sm')]: {
        padding: '20px 24px',
        marginTop: '20px',
        '& p, span': {
            fontSize: '16px',
        },
        '& h4': {
            fontSize: '20px',
            marginBottom: '20px',
            textAlign: 'center',
        },
        '& .MuiTypography-body1': {
            fontSize: '16px',
        },
    },
}));

const InformationBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    [theme.breakpoints.up('sm')]: {
        gap: '20px',
    },
    marginBottom: '20px',
}));

const StyledStepper = styled(Stepper)(() => ({
    marginTop: '10px',
    marginBottom: '30px',
    '& .MuiStepLabel-label': {
        fontSize: '14px !important',
    },
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

    function getIconsByClassname(className: string): { [index: string]: React.ReactElement } {
        switch (className) {
            case 'cancel-pending':
                return {
                    1: <DesktopWindowsOutlinedIcon />,
                    2: <DisabledByDefaultIcon />,
                };
            case 'cancel-processing':
                return {
                    1: <DesktopWindowsOutlinedIcon />,
                    2: <ArchiveIcon />,
                    3: <DisabledByDefaultIcon />,
                };
            case 'waiting-payment':
                return {
                    1: <LocalAtmIcon />,
                    2: <ArchiveIcon />,
                    3: <LocalShippingIcon />,
                    4: <DoneAllIcon />,
                };
            default:
                return {
                    1: <DesktopWindowsOutlinedIcon />,
                    2: <ArchiveIcon />,
                    3: <LocalShippingIcon />,
                    4: <DoneAllIcon />,
                };
        }
    }

    const icons: { [index: string]: React.ReactElement } = getIconsByClassname(
        className ?? 'default',
    );

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
};

const normalSteps = [
    ORDER_STATUSES.get(STATUS_PENDING)!.label,
    ORDER_STATUSES.get(STATUS_PROCESSING)!.label,
    ORDER_STATUSES.get(STATUS_SHIPPING)!.label,
    ORDER_STATUSES.get(STATUS_COMPLETED)!.label,
];

const cancelOnPendingSteps = [
    ORDER_STATUSES.get(STATUS_PENDING)!.label,
    ORDER_STATUSES.get(STATUS_CANCELLED)!.label,
];

const cancelOnProcessingSteps = [
    ORDER_STATUSES.get(STATUS_PENDING)!.label,
    ORDER_STATUSES.get(STATUS_PROCESSING)!.label,
    ORDER_STATUSES.get(STATUS_CANCELLED)!.label,
];

type StepperLabel = {
    className?: string;
    active: number;
    steps: string[];
};

const getStepperLabel = (
    orderStatus: string,
    payment: Pick<PaymentOrderDTO, 'method' | 'status'>,
): StepperLabel => {
    switch (orderStatus) {
        case STATUS_PENDING:
            if (payment.status === STATUS_WAIT_FOR_PAYMENT) {
                return {
                    className: 'waiting-payment',
                    active: 0,
                    steps: [
                        PAYMENT_STATUSES.get(STATUS_WAIT_FOR_PAYMENT)!.label,
                        ...normalSteps.slice(1),
                    ],
                };
            }
            return {
                active: 0,
                steps: normalSteps,
            };
        case STATUS_PROCESSING:
            if (payment.status === STATUS_WAIT_FOR_PAYMENT) {
                return {
                    className: 'waiting-payment',
                    active: 0,
                    steps: [
                        PAYMENT_STATUSES.get(STATUS_WAIT_FOR_PAYMENT)!.label,
                        ...normalSteps.slice(1),
                    ],
                };
            }
            return {
                active: 1,
                steps: normalSteps,
            };
        case STATUS_SHIPPING:
            return {
                active: 2,
                steps: normalSteps,
            };
        case STATUS_CANCELLED:
            if (payment.method === 'COD') {
                return {
                    className: 'cancel-processing',
                    active: 2,
                    steps: cancelOnProcessingSteps,
                };
            }
            return {
                className: 'cancel-pending',
                active: 1,
                steps: cancelOnPendingSteps,
            };
        case STATUS_COMPLETED:
            return {
                active: 3,
                steps: normalSteps,
            };
        default:
            return {
                active: 1,
                steps: normalSteps,
            };
    }
};

interface OrderDetailsProps {
    order: OrderSchemaDTO;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);
    const [variants, setVariants] = useState<VariantInCart[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    useEffect(() => {
        const fetches = order.products.map((item) => getSingleProductVariant(item));
        setIsLoadingItems(true);
        Promise.all(fetches)
            .then((variants) => {
                setVariants(variants);
                setIsLoadingItems(false);
            })
            .catch((error) => {
                console.error('Failed to fetch product details:', error);
                setIsLoadingItems(false);
            });
    }, [order]);

    const handleClickItem = (slug: string) => {
        router.push(`${RootPath.ProductDetails}/${slug}`);
    };

    const steppers = getStepperLabel(order.orderStatus!, {
        method: order.paymentOrder!.method,
        status: order.paymentOrder!.status,
    });

    console.log(order);

    const handleCancelOrder = (cancelOrderValues: { cancelReason: string }) => {
        dispatch(
            cancelAnOrder({
                id: order._id,
                cancelOrderRequestDTO: cancelOrderValues,
            }),
        )
            .then(() => dispatch(getOrder(order._id)))
            .catch((err) => console.log(err));
    };

    const handleGetNewPaymentUrl = debounce(() => {
        dispatch(
            newPaymentUrl({
                id: order._id,
                paymentReturnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${RootPath.Order}/${order._id}`,
            }),
        ).catch((err) => console.log(err));
    }, 2000);

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
            <WhiteBox>
                <Typography variant='h4'>Tình trạng đơn hàng</Typography>
                <div className='w-full'>
                    <StyledStepper
                        activeStep={steppers.active}
                        alternativeLabel
                        connector={<QontoConnector />}
                        className={steppers.className}
                    >
                        {steppers.steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={StepIconNormal}>{label}</StepLabel>
                            </Step>
                        ))}
                    </StyledStepper>
                </div>

                <Typography variant='h4'>Thông tin đơn hàng</Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: { sm: 'grid', xs: 'flex' },
                        gridTemplateColumns: { sm: '45% 1fr' },
                        flexDirection: 'column',
                        gap: { sm: '20px', xs: '12px' },
                    }}
                >
                    <div className='flex flex-col w-full'>
                        <InformationBox>
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
                                    }}
                                >
                                    <Typography variant='body1'>
                                        Tên :{' '}
                                        <span>{order.shippingOrder.toAddress.customerName}</span>
                                    </Typography>
                                    <Typography variant='body1'>
                                        Số điện thoại :{' '}
                                        <span>{order.shippingOrder.toAddress.phoneNumbers}</span>
                                    </Typography>
                                    <Typography variant='body1'>
                                        Địa chỉ :{' '}
                                        <span>
                                            {buildAddressString(order.shippingOrder.toAddress)}
                                        </span>
                                    </Typography>
                                </Box>
                            </div>
                        </InformationBox>

                        <InformationBox>
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
                                    }}
                                >
                                    <Typography variant='body1'>
                                        Phương thức thanh toán:{' '}
                                        <span>
                                            {order.paymentOrder!.method !== 'COD'
                                                ? order.paymentOrder?.method
                                                : 'Thanh toán khi nhận hàng'}
                                        </span>
                                    </Typography>
                                    <Typography variant='body1'>
                                        Trạng thái:{' '}
                                        <span>
                                            {
                                                PAYMENT_STATUSES.get(order.paymentOrder!.status)!
                                                    .label
                                            }
                                            {order.orderStatus === STATUS_CANCELLED &&
                                                ` - ${ORDER_STATUSES.get(STATUS_CANCELLED)!.label}`}
                                        </span>
                                    </Typography>
                                </Box>
                            </div>
                        </InformationBox>
                    </div>
                    <div className='w-full'>
                        {isLoadingItems &&
                            order.products.map((item) => (
                                <SkeletonCartItem key={item.productId! + item.sku!} />
                            ))}
                        <div className='w-full'>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { sm: '16px', xs: '14px' },
                                    padding: { sm: '0 24px', xs: 0 },
                                }}
                            >
                                Đơn mua:
                            </Typography>
                            {variants.map((variant) => (
                                <OrderItemCard
                                    key={variant.id + variant.data.sku}
                                    item={variant}
                                    handleClick={handleClickItem}
                                />
                            ))}
                            <Box
                                className='flex flex-col'
                                sx={{
                                    margin: { sm: '0px 24px', xs: 0 },
                                    padding: '10px 0',
                                    gap: '5px',
                                    '& span': {
                                        color: '#ee4949',
                                    },
                                    borderBottom: '1px solid #e0e0e0',
                                }}
                            >
                                <div className='flex justify-between'>
                                    <Typography variant='body1'>Áp dụng khuyến mãi</Typography>
                                    <span>
                                        {currencyFormat(order.checkoutOrder.totalApplyDiscount)}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <Typography variant='body1'>Chi phí vận chuyển</Typography>
                                    <span>{currencyFormat(order.checkoutOrder.shippingFee)}</span>
                                </div>
                            </Box>
                            <Box
                                className='flex justify-between'
                                sx={{
                                    margin: { sm: '0px 24px', xs: 0 },
                                    padding: '10px 0',
                                    '& span': {
                                        color: '#ee4949',
                                    },
                                }}
                            >
                                <Typography variant='body1'>Tổng</Typography>
                                <span>{currencyFormat(order.checkoutOrder.totalPrice)}</span>
                            </Box>
                        </div>
                    </div>
                </Box>
                {(order.orderStatus === STATUS_PENDING ||
                    order.orderStatus === STATUS_PROCESSING) &&
                    order.paymentOrder!.status === STATUS_WAIT_FOR_PAYMENT && (
                        <Box
                            className='w-full flex items-center justify-center'
                            sx={{
                                justifyContent: 'flex-end',
                                gap: { sm: '20px', xs: '10px' },
                                paddingTop: { sm: '20px', xs: '10px' },
                                marginTop: { sm: '15px', xs: '10px' },
                                borderTop: '2px solid #e0e0e0',
                                '& button': {
                                    padding: '10px 12px',
                                },
                            }}
                        >
                            {order.paymentOrder!.method !== 'COD' && (
                                <Button
                                    variant='contained'
                                    sx={{
                                        backgroundColor: '#FFA500',
                                        '&:hover': {
                                            backgroundColor: '#FF8C00',
                                        },
                                    }}
                                    onClick={handleGetNewPaymentUrl}
                                >
                                    Tiến hành thanh toán
                                </Button>
                            )}
                            <Button
                                variant='contained'
                                sx={{ backgroundColor: '#eb2525' }}
                                onClick={() => setOpenDialog(true)}
                            >
                                Hủy đơn
                            </Button>
                        </Box>
                    )}
            </WhiteBox>

            {openDialog && (
                <ShowDialog
                    isOpen={openDialog}
                    dialogTitle='Hủy mua hàng'
                    handleClose={() => setOpenDialog(false)}
                    isSmall={false}
                >
                    <div className='flex flex-col w-full'>
                        <Typography
                            variant='body1'
                            sx={{
                                fontSize: { sm: '16px', xs: '14px' },
                                marginBottom: '12px',
                                textAlign: 'justify',
                            }}
                        >
                            Bạn có chắc chắn muốn xóa đơn hàng này không ?
                        </Typography>
                        <Formik
                            initialValues={{ cancelReason: '' }}
                            validationSchema={CancelOrderReasonValidateSchema}
                            onSubmit={(values) => {
                                handleCancelOrder(values);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className='w-full'>
                                    <TextFieldCustom
                                        name='cancelReason'
                                        label='Lý do hủy đơn'
                                        styles={{ marginBottom: '24px' }}
                                    />
                                    <Box
                                        className='w-full flex'
                                        sx={{ justifyContent: 'flex-end', gap: '12px' }}
                                    >
                                        <CommonBtn
                                            variant='contained'
                                            type='submit'
                                            content='Xác nhận'
                                            loading={isSubmitting}
                                            disabled={isSubmitting}
                                            styles={{ backgroundColor: '#eb2525' }}
                                        />
                                        <Button
                                            variant='outlined'
                                            onClick={() => setOpenDialog(false)}
                                        >
                                            Đóng
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </ShowDialog>
            )}
        </Container>
    );
};

export default OrderDetails;
