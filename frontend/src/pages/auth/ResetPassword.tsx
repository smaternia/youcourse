import { useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import { ResetPasswordType, changePasswordValidation, resetPasswordValidation } from '@/lib/validations/auth.validation'
import { resetPasswordDefaultValues } from '@/lib/defaultValues'

import { useResetPassword } from '@/store/server/useAuth'
import { useTitle } from '@/hooks'
import { useChangePassword } from '@/store/server/useUser'

const CHANGE_PASSWORD = '/me/change-password'

export default function ResetPassword() {
  useTitle('Reset Password')
  const navigate = useNavigate()
  const location = useLocation()
  const isChangePassword = location.pathname === CHANGE_PASSWORD

  const { mutate: resetPassword, isLoading } = useResetPassword()
  const { mutate: changePassword, isLoading: isLoadingChange } = useChangePassword()

  const forms = useForm<ResetPasswordType>({
    mode: 'onTouched',
    resolver: yupResolver(isChangePassword ? changePasswordValidation : resetPasswordValidation),
    defaultValues: resetPasswordDefaultValues
  })

  const onSubmit = (values: ResetPasswordType) => {
    if (!isChangePassword) {
      const data = { token: values.token as string, password: values.password }
      return resetPassword(data, {
        onSuccess: () => {
          forms.reset(resetPasswordDefaultValues)
          navigate('/sign-in')
        }
      })
    }

    const data = { password: values.password, confirmPassword: values.confirmPassword }
    return changePassword(data, {
      onSuccess: () => {
        forms.reset(resetPasswordDefaultValues)
        navigate('/me')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-center text-primary md:absolute md:mb-0 md:flex-row md:text-left" />
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Reset Password</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">Choose a new password for your account</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          {!isChangePassword && (
            <FormField
              name="token"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Verification Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="76d67hi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">New Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Confirmation Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-semibold" type="submit" loading={isLoading || isLoadingChange}>
            Reset Password
          </Button>
        </form>
      </Form>
    </section>
  )
}
