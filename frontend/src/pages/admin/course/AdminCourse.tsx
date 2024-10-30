import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiOutlineBookOpen, HiOutlineEye, HiOutlineEyeSlash, HiOutlineVideoCamera, HiPlus } from 'react-icons/hi2'

import { Heading } from '@/components/organisms'
import { More, Image, Loading, Pagination, TableSearch } from '@/components/atoms'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { useDialog } from '@/store/client'
import { cn, formatDate } from '@/lib/utils'
import { useDisableBodyScroll, useQueryParams, useTitle } from '@/hooks'
import { useDeleteCourse, useGetCourses, usePublishCourse } from '@/store/server/useCourse'

interface FormFields {
  search: string
}

export default function AdminCourse() {
  useTitle('Admin ~ Course')
  const navigate = useNavigate()

  const { dialog } = useDialog()
  const forms = useForm<FormFields>()
  const { mutate: publishCourse } = usePublishCourse()
  const { mutateAsync: deleteCourse } = useDeleteCourse()
  const { params, createParam, deleteParam } = useQueryParams(['page', 'search'])

  const {
    data: courses,
    isFetching,
    refetch
  } = useGetCourses({
    search: params.search || '',
    page: Number(params.page) || 1
  })

  useDisableBodyScroll(isFetching)

  const onSubmit = (data: FormFields) => {
    if (data.search === '') {
      deleteParam('search')
    } else {
      createParam({ key: 'search', value: data.search })
    }

    refetch()
  }

  const handleDelete = (courseId: string) => {
    void dialog({
      title: 'Are you sure?',
      description: 'This will delete the course and all its videos',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteCourse(courseId)
    })
  }

  return (
    <React.Fragment>
      {isFetching && <Loading />}
      <Heading className="flex items-center gap-5 text-font">
        <Heading.Icon icon={HiOutlineBookOpen} />
        <div className="flex flex-col">
          <Heading.Title>All Courses</Heading.Title>
          <Heading.SubTitle className="text-font/80">Manage all courses in the platform</Heading.SubTitle>
        </div>
      </Heading>
      <div className="mt-16 flex items-center justify-between">
        <Button className="gap-3" onClick={() => navigate('/admin/course/create')}>
          <HiPlus className="text-xl" />
          <span className="text-[13px]">Add new course</span>
        </Button>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="w-4/12">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <TableSearch {...field} value={field.value ?? ''} placeholder="Search..." />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <Table className="mt-6 overflow-hidden rounded-md text-font">
        <TableHeader className="bg-primary/80">
          <TableRow className="border-zinc-300">
            <TableHead className="text-white">Thumbnail</TableHead>
            <TableHead className="text-white">Title</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Created At</TableHead>
            <TableHead className="text-white">Visibility</TableHead>
            <TableHead className="text-white">Total User</TableHead>
            <TableHead className="text-white">Total Videos</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.data?.map((course) => (
            <TableRow key={course.id} className="text-[13px]">
              <TableCell>
                <Image src={course.thumbnail} alt={course.title} className="w-36 rounded-md object-cover md:h-20" />
              </TableCell>
              <TableCell className="font-semibold">{course.title}</TableCell>
              <TableCell className="truncate-3 w-fit">{course.description}</TableCell>
              <TableCell position="center">{formatDate(course.created_at)}</TableCell>
              <TableCell position="center">
                <div
                  className={cn(
                    course.is_published
                      ? 'border-green-500 bg-green-200 text-green-700'
                      : 'border-red-500 bg-red-200 text-red-700',
                    'rounded-full border px-2 py-1 font-medium'
                  )}
                >
                  <p className="text-xs">{course.is_published ? 'Published' : 'Unpublished'}</p>
                </div>
              </TableCell>
              <TableCell position="center">{course._count.members}</TableCell>
              <TableCell position="center">{course._count.videos}</TableCell>
              <TableCell position="center">
                <More type="settings">
                  <More.Item type="edit" onClick={() => navigate(`/admin/course/${course.id}`)} />
                  <More.Item type="delete" onClick={() => handleDelete(course.id)} />
                  <More.Item
                    label={course.is_published ? 'Unpublish' : 'Publish'}
                    icon={course.is_published ? HiOutlineEyeSlash : HiOutlineEye}
                    onClick={() => publishCourse({ id: course.id, published: !course.is_published })}
                  />
                  <More.Item
                    label="See videos"
                    icon={HiOutlineVideoCamera}
                    onClick={() => navigate(`/admin/course/${course.id}/video`)}
                  />
                </More>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {courses?.meta && courses?.meta?.total > 10 ? (
        <Pagination
          pageSize={courses?.meta.limit as number}
          totalCount={courses?.meta.total as number}
          currentPage={params.page !== '' ? parseInt(params.page) : 1}
          onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </React.Fragment>
  )
}
