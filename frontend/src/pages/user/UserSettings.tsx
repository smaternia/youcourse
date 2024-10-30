import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiOutlineArrowLeftOnRectangle, HiOutlineLockClosed } from 'react-icons/hi2'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, Container, EditEmail, Heading, UploadPhoto } from '@/components/organisms'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'
import { useUpdateMe } from '@/store/server/useUser'

import { editProfileDefaultValues } from '@/lib/defaultValues'
import { EditUserType, editUserValidation } from '@/lib/validations/user.validation'
import { useTitle } from '@/hooks'
import { UserType } from '@/lib/types/user.type'

export default function UserSettings() {
  useTitle('User Settings')
  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)

  const { mutate: logout } = useLogout()
  const { mutate: updateMe, isLoading } = useUpdateMe()

  const forms = useForm<EditUserType>({
    mode: 'onTouched',
    resolver: yupResolver(editUserValidation),
    defaultValues: editProfileDefaultValues
  })

  React.useEffect(() => {
    forms.setValue('fullname', user?.fullname as string)
    forms.setValue('username', user?.username as string)
  }, [user, forms])

  const onSubmit = (values: EditUserType) => {
    updateMe(values)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Container className="xl:w-4/12">
      <Heading>
        <Heading.SubTitle>#SetYourInfo</Heading.SubTitle>
        <Heading.Title>Edit Profile</Heading.Title>
      </Heading>
      <section className="mt-10 border-b pb-10">
        <UploadPhoto user={user as UserType} />
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="col-span-1 flex w-full flex-col gap-5">
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto w-fit text-[13px]" loading={isLoading}>
              Save Changes
            </Button>
          </form>
        </Form>
      </section>

      <section className="pt-10">
        <Heading className="pb-8">
          <Heading.SubTitle>#SetYourAccount</Heading.SubTitle>
          <Heading.Title>User Settings</Heading.Title>
        </Heading>
        <div className="flex w-fit gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/me/change-password')}
            className="gap-2.5 border-zinc-300 text-[13px] text-font"
          >
            <HiOutlineLockClosed className="text-xl" />
            Reset Password
          </Button>
          <EditEmail email={user?.email as string} />
          <Alert
            title="Comeback soon?"
            desc="Are you sure you want to sign out of the app?"
            btnText="sign out"
            action={handleLogout}
          >
            <Button variant="destructive" className="gap-2.5 text-[13px]">
              <HiOutlineArrowLeftOnRectangle className="text-xl" />
              Sign Out
            </Button>
          </Alert>
        </div>
      </section>
    </Container>
  )
}
