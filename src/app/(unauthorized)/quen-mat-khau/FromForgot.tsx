'use client';

/* eslint-disable react/display-name */
import React, { memo, useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ForgotPasswordModel } from 'models';
import { TextFieldCustom } from '@/components/Common/FormFormik';
import { isEmail } from '@/utils';
import Box from '@mui/system/Box';

type ForgotPasswordProps = {
    sendCode: (email: string) => void;
};

export const ForgotForm = memo(({ sendCode }: ForgotPasswordProps) => {
    const [showNewPass, setShowNewPass] = useState<boolean>(false);
    const [showRePass, setShowRePass] = useState<boolean>(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

    const { touched, values, handleChange, errors } = useFormikContext<ForgotPasswordModel>();

    const handleClick = () => {
        if (values.email) {
            sendCode(values.email);
        }
    };

    useEffect(() => {
        if (values.email) {
            setIsValidEmail(isEmail(values.email));
        }
    }, [values.email]);

    return (
        <>
            <Stack
                direction='row'
                sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Box sx={{ width: { sm: '70%', xs: '65%' } }}>
                    <TextFieldCustom name='email' label='Email' placeholder='Email' />
                </Box>

                <Box>
                    <Button
                        variant='outlined'
                        onClick={handleClick}
                        disabled={!isValidEmail}
                        sx={{
                            fontSize: { sm: '14px', xs: '12px' },
                        }}
                    >
                        Gửi OTP
                    </Button>
                </Box>
                {/* <ButtonCustom
                    content="Gửi OTP"
                    variant="text"
                    handleClick={() => {
                        if (values.email) {
                            sendCode(values.email);
                        }
                    }}
                    disabled={!values.email}
                    styles={{ fontSize: '12px' }}
                /> */}
            </Stack>

            <TextField
                id='otpCode'
                name='otpCode'
                label='Mã OTP'
                error={touched.otpCode && Boolean(errors.otpCode)}
                helperText={touched.otpCode && errors.otpCode}
                onChange={handleChange}
                variant='outlined'
                fullWidth
                size='small'
            />

            <FormControl fullWidth variant='outlined' size='small'>
                <InputLabel htmlFor='password' error={touched.password && Boolean(errors.password)}>
                    Mật khẩu mới
                </InputLabel>
                <OutlinedInput
                    size='small'
                    id='password'
                    type={showNewPass ? 'text' : 'password'}
                    name='password'
                    label='Mật khẩu mới'
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={() => setShowNewPass((show) => !show)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge='end'
                                size='small'
                            >
                                {showNewPass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {touched.password && errors.password && (
                    <FormHelperText error={touched.password && Boolean(errors.password)}>
                        {errors.password}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth variant='outlined' size='small'>
                <InputLabel
                    htmlFor='re_password'
                    error={touched.re_password && Boolean(errors.re_password)}
                >
                    Nhập lại mật khẩu
                </InputLabel>
                <OutlinedInput
                    size='small'
                    id='re_password'
                    type={showRePass ? 'text' : 'password'}
                    name='re_password'
                    label='Nhập lại mật khẩu'
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={() => setShowRePass((show) => !show)}
                                onMouseDown={(e) => e.preventDefault()}
                                edge='end'
                                size='small'
                            >
                                {showRePass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {touched.re_password && errors.re_password && (
                    <FormHelperText error={touched.re_password && Boolean(errors.re_password)}>
                        {errors.re_password}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
});
