import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand } from '@/components/atoms'

import { VerifyEmailType, verifyEmailValidation } from '@/lib/validations/auth.validation'

import { useVerifyEmail } from '@/store/server/useAuth'
import { useTitle } from '@/hooks'

export default function VerifyEmail() {
  useTitle('Verify Email')
  const navigate = useNavigate()
  const { mutate: verify, isLoading } = useVerifyEmail()

  const forms = useForm<VerifyEmailType>({
    mode: 'onTouched',
    resolver: yupResolver(verifyEmailValidation),
    defaultValues: { token: '' }
  })

  const onSubmit = (values: VerifyEmailType) => {
    verify(values.token, {
      onSuccess: () => {
        forms.reset({ token: '' })
        navigate('/sign-in')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-center text-primary md:absolute md:mb-0 md:flex-row md:text-left" />
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Verify Email</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          We've sent the verification code to the email you registered.
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <FormField
            name="token"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold dark:text-white">Verification Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="76d67hi" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="font-semibold" type="submit" loading={isLoading}>
            Verify
          </Button>
        </form>
      </Form>
    </section>
  )
}
