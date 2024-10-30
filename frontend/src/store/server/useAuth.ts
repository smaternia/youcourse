import {
  forgotPasswordFn,
  loginFn,
  loginWithGoogleFn,
  logoutFn,
  registerFn,
  resetPasswordFn,
  verifyEmailFn
} from '@/api/auth.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'

import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useToken, useUserInfo } from '../client'

export const useRegister = () => {
  return useMutation(registerFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Your account is successfully registered',
        description: 'Please check your email to verify'
      })
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation(verifyEmailFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Your email has been successfully verified',
        description: 'Please sign in to continue'
      })
    }
  })
}

export const useLogin = () => {
  return useMutation(loginFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      useToken.getState().storeAccessToken(data.access_token)
      useToken.getState().storeRefreshToken(data.refresh_token)
      useUserInfo.getState().setUser(data.user)
      toast({
        title: 'Sign in successfully',
        description: 'Welcome to the YouCourse app'
      })
    }
  })
}

export const useLoginWithGoogle = () => {
  return useMutation(loginWithGoogleFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      useToken.getState().storeAccessToken(data.access_token)
      useToken.getState().storeRefreshToken(data.refresh_token)
      useUserInfo.getState().setUser(data.user)
      toast({
        title: 'Sign in successfully',
        description: 'Welcome to the YouCourse app'
      })
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation(logoutFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.clear()
      useToken.getState().removeAccessToken()
      useToken.getState().removeRefreshToken()
      useUserInfo.getState().removeUser()
      toast({
        title: 'Logout Successfully',
        description: 'You have successfully logged out of the app'
      })
    }
  })
}

export const useForgotPassword = () => {
  return useMutation(forgotPasswordFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Email sent successfully',
        description: 'Please check your email to reset your password'
      })
    }
  })
}

export const useResetPassword = () => {
  return useMutation(resetPasswordFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Password successfully reset',
        description: 'Please sign in to continue'
      })
    }
  })
}
