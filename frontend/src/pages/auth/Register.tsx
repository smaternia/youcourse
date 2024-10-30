import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Brand, Password } from '@/components/atoms'

import { RegisterType, registerValidation } from '@/lib/validations/auth.validation'
import { registerDefaultValues } from '@/lib/defaultValues'

import { useRegister } from '@/store/server/useAuth'
import { useTitle } from '@/hooks'

export default function Register() {
  useTitle('Sign Up')
  const navigate = useNavigate()
  const { mutate: register, isLoading } = useRegister()

  const forms = useForm<RegisterType>({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation),
    defaultValues: registerDefaultValues
  })

  const onSubmit = (values: RegisterType) => {
    register(values, {
      onSuccess: () => {
        forms.reset(registerDefaultValues)
        navigate('/verify')
      }
    })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full flex-col justify-center gap-[10px] px-5 py-8 md:w-[440px] md:p-0">
      <Brand className="static left-6 top-6 mb-5 flex-col text-center text-primary md:absolute md:mb-0 md:flex-row md:text-left" />
      <div className="flex flex-col">
        <h2 className="mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]">Sign Up</h2>
        <p className="text-[13px] font-medium text-zinc-500 md:text-sm">
          Please enter your details to create an account
        </p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Fullname</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
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
          <Button className="font-semibold" type="submit" loading={isLoading}>
            Sign Up
          </Button>
        </form>
      </Form>
      <p className="mt-7 text-center text-[15px] font-semibold text-font">
        Already have an account?{' '}
        <Link to="/sign-in" className="text-primary hover:underline dark:text-white">
          Sign In!
        </Link>
      </p>
    </section>
  )
}
