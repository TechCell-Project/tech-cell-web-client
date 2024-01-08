import * as yup from 'yup';

export const LoginSchema = yup.object({
    emailOrUsername: yup.string().required('Bạn hãy nhập tài khoản hoặc email!'),
    password: yup
        .string()
        .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
        .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
        .required('Bạn hãy nhập mật khẩu!'),
});

export const SignupSchema = yup.object({
    firstName: yup.string().required('Bạn cần điền tên'),
    lastName: yup.string().required('Bạn cần điền họ'),
    userName: yup.string().required('Bạn cần điền tên đăng nhập'),
    email: yup.string().email('Enter a valid email').required('Bạn cần điền Email'),
    //mobile: yup.string().required('Bạn cần nhập sdt'),
    password: yup.string().min(8, 'Mật khẩu cần ít nhất 8 kí tự').required('Bạn cần nhập mật khẩu'),
    re_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu chưa khớp')
        .required('Bạn cần nhập lại mật khẩu!'),
});

export const ProfileSchema = yup.object({
    firstName: yup.string().required('Bạn cần điền tên'),
    lastName: yup.string().required('Bạn cần điền họ'),
    phoneNumbers: yup
        .string()
        .min(10, 'Số điện thoại phải đủ 10 số!')
        .max(10, 'Số điện thoại phải đủ 10 số!'),
    referralCode: yup.string(),
});

export const ProfileAddressSchema = yup.object({
    // address: yup.object().shape({
    addressName: yup.string().required('Vui lòng nhập địa chỉ!'),
    customerName: yup.string().required('Vui lòng nhập tên khách hàng!'),
    phoneNumbers: yup
        .string()
        .min(10, 'Số điện thoại phải đủ 10 số!')
        .max(10, 'Số điện thoại phải đủ 10 số!')
        .required('Vui lòng nhập số điện thoại!'),
    provinceLevel: yup.object().required('Vui lòng chọn tỉnh / thành!'),
    districtLevel: yup.object().required('Vui lòng chọn quận / huyện!'),
    wardLevel: yup.object().required('Vui lòng chọn xã / phường!'),
    detail: yup.string().required('Vui lòng nhập địa chỉ cụ thể!'),
    // }),
});

export const VerifyEmailSchema = yup.object({
    email: yup.string().email('Bạn cần điền đúng định dạng email').required('Bạn cần nhập email'),
    otpCode: yup
        .string()
        .matches(/^\d+$/, 'Code OTP chỉ bao gồm chữ số')
        .required('Bạn cần nhập OTP code được gửi tới email cần xác minh'),
});

export const forgotPasswordValidate = yup.object({
    email: yup.string().email('Sai định dạng email!').required('Email không được bỏ trống!'),
    otpCode: yup
        .string()
        .matches(/^\d+$/, 'Mã OTP chỉ được chứa ký tự số!')
        .length(6, 'Mã OTP gồm 6 ký tự số!')
        .required('Mã OTP không được bỏ trống'),
    password: yup
        .string()
        .min(8, 'Mật khẩu có ít nhất 8 kí tự!')
        .max(24, 'Mật khẩu có nhiều nhất 24 kí tự')
        .required('Mật khẩu mới không được bỏ trống!'),
    re_password: yup
        .string()
        .oneOf([yup.ref('password')], 'Không trùng khớp với mật khẩu mới!')
        .required('Mật khẩu nhập lại không được bỏ trống !'),
});
