import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiOutlineArrowLeftOnRectangle, HiOutlineCog6Tooth, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi2'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, EditEmail, Heading, UploadPhoto } from '@/components/organisms'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { UserType } from '@/lib/types/user.type'
import { editProfileDefaultValues } from '@/lib/defaultValues'
import { EditUserType, editUserValidation } from '@/lib/validations/user.validation'

import { useTitle } from '@/hooks'
import { useUserInfo } from '@/store/client'
import { useLogout } from '@/store/server/useAuth'
import { useUpdateMe } from '@/store/server/useUser'

export default function AdminProfile() {
  useTitle('Admin ~ Profile')
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
    <React.Fragment>
      <Heading className="flex items-center gap-5 text-font">
        <Heading.Icon icon={HiOutlineUser} />
        <div className="flex flex-col">
          <Heading.Title>Edit Profile</Heading.Title>
          <Heading.SubTitle className="text-font/80">Manage your profile information</Heading.SubTitle>
        </div>
      </Heading>
      <section className="mx-auto mt-16 w-6/12">
        <UploadPhoto user={user as UserType} />
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            <Button className="ml-auto mt-2 w-fit" loading={isLoading}>
              Save Changes
            </Button>
          </form>
        </Form>
        <div className="mt-8 border-t pt-5 text-font">
          <p className="mb-5 flex items-center gap-2 text-lg font-semibold">
            <HiOutlineCog6Tooth className="text-xl" />
            User Settings
          </p>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-fit gap-2.5 text-xs"
              onClick={() => navigate('/admin/profile/change-password')}
            >
              <HiOutlineLockClosed className="text-lg" />
              Reset Password
            </Button>
            <EditEmail email={user?.email as string} />
            <Alert
              title="Comeback soon?"
              desc="Are you sure you want to sign out of the app?"
              btnText="sign out"
              action={handleLogout}
            >
              <Button className="w-fit gap-2.5 text-xs" variant="destructive">
                <HiOutlineArrowLeftOnRectangle className="text-lg" />
                Sign Out from App
              </Button>
            </Alert>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
