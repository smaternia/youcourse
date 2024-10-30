import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import { LoginType, loginValidation } from '@/lib/validations/auth.validation'
import { loginDefaultValues } from '@/lib/defaultValues'

import { useLogin } from '@/store/server/useAuth'
import { useTitle } from '@/hooks'

export default function Login() {
  useTitle('Sign In')
  const navigate = useNavigate()
  const { mutate: login, isLoading } = useLogin()

  const forms = useForm<LoginType>({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation),
    defaultValues: loginDefaultValues
  })

  const onSubmit = (values: LoginType) => {
    login(values, {
      onSuccess: (results) => {
        forms.reset(loginDefaultValues)
        if (results.user.role === 'ADMIN') {
          return navigate('/admin/course')
        }
        navigate('/')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-center text-primary md:absolute md:mb-0 md:flex-row md:text-left" />
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Sign In</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">Wellcome, Please enter your details</p>
      </div>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-6">
          <FormField
            name="email"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="johndoe@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-primary hover:underline dark:text-white"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-semibold text-white" type="submit" loading={isLoading}>
            Sign In
          </Button>
        </form>
      </Form>
      <p className="mt-7 text-center text-[15px] font-semibold text-font">
        Don't have an account?{' '}
        <Link to="/sign-up" className="text-primary hover:underline dark:text-white">
          Sign Up
        </Link>
      </p>
    </section>
  )
}
