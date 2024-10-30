import * as Yup from 'yup'

export const registerValidation = Yup.object({
  fullname: Yup.string().required('Fullname is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be more than 8 characters')
    .matches(/[a-z]/g, 'Must contain at least 1 lowercase letter')
    .matches(/[A-Z]/g, 'Must contain at least 1 uppercase letter')
    .matches(/[0-9]/g, 'Must contain at least 1 number')
    .matches(/^\S*$/g, 'Cannot contain spaces'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})

export type RegisterType = Yup.InferType<typeof registerValidation>

export const verifyEmailValidation = Yup.object({
  token: Yup.string().required('Verification code is required')
})

export type VerifyEmailType = Yup.InferType<typeof verifyEmailValidation>

export const loginValidation = Yup.object({
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().required('Password is required')
})

export type LoginType = Yup.InferType<typeof loginValidation>

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email('Email is not valid').required('Email is required')
})

export type ForgotPasswordType = Yup.InferType<typeof forgotPasswordValidation>

export const resetPasswordValidation = Yup.object({
  token: Yup.string().required('Token is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be more than 8 characters')
    .matches(/[a-z]/g, 'Must contain at least 1 lowercase letter')
    .matches(/[A-Z]/g, 'Must contain at least 1 uppercase letter')
    .matches(/[0-9]/g, 'Must contain at least 1 number')
    .matches(/^\S*$/g, 'Cannot contain spaces'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})

export type ResetPasswordType = {
  token?: string
  password: string
  confirmPassword: string
}

export const changePasswordValidation = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be more than 8 characters')
    .matches(/[a-z]/g, 'Must contain at least 1 lowercase letter')
    .matches(/[A-Z]/g, 'Must contain at least 1 uppercase letter')
    .matches(/[0-9]/g, 'Must contain at least 1 number')
    .matches(/^\S*$/g, 'Cannot contain spaces'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})

export type ChangePasswordType = Yup.InferType<typeof changePasswordValidation>
