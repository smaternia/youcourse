import { CourseSearch, Loading, NoData, Pagination } from '@/components/atoms'
import { Container, CourseCard, Heading } from '@/components/organisms'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { useDisableBodyScroll, useQueryParams, useTitle } from '@/hooks'
import { useGetCourses } from '@/store/server/useCourse'
import { useGetMyCourses } from '@/store/server/useUser'
import { useForm } from 'react-hook-form'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useLocation } from 'react-router-dom'

const PATH = '/me/course'

interface FormFields {
  search: string
}

export default function Course() {
  useTitle('Course')
  const location = useLocation()
  const isMyCourse = location.pathname === PATH
  const forms = useForm<FormFields>()

  const { params, createParam, deleteParam } = useQueryParams(['page', 'search'])

  const {
    data: courses,
    isLoading: loadingCourse,
    refetch: refetchCourse
  } = useGetCourses({
    page: Number(params.page) || 1,
    search: params.search || '',
    enabled: !isMyCourse,
    limit: 6
  })

  const {
    data: myCourses,
    isLoading: loadingMy,
    refetch: refetchMy
  } = useGetMyCourses({
    page: Number(params.page) || 1,
    search: params.search || '',
    enabled: isMyCourse
  })

  useDisableBodyScroll(loadingCourse || loadingMy)

  const onSubmit = (data: FormFields) => {
    if (data.search === '' || data.search === undefined) {
      deleteParam('search')
    } else {
      createParam({ key: 'search', value: data.search })
    }

    if (isMyCourse) return refetchMy()
    refetchCourse()
  }

  return (
    <Container className="relative lg:pb-20">
      {(loadingCourse || loadingMy) && <Loading />}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <Heading>
          <Heading.SubTitle className="mb-2">#LearnFromExpert</Heading.SubTitle>
          <Heading.Title>
            {params.search ? `Search: ${params.search}` : isMyCourse ? 'All My Courses' : 'All Featured Course'}
          </Heading.Title>
        </Heading>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="md:w-80">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <CourseSearch {...field} value={field.value ?? ''} placeholder="Search" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-16 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {isMyCourse
          ? myCourses?.data.map((course) => <CourseCard key={course.id} course={course} />)
          : courses?.data.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
      {isMyCourse && myCourses?.data.length === 0 && (
        <NoData
          title="No course found"
          text="You haven't joined any course yet. Start learning now!"
          icon={HiOutlineMagnifyingGlass}
        />
      )}
      {!isMyCourse && courses?.data.length === 0 && (
        <NoData
          title="No course found"
          text="There are no featured courses yet. Please come back later!"
          icon={HiOutlineMagnifyingGlass}
        />
      )}
      {courses?.meta && courses?.meta?.total > 10 ? (
        <Pagination
          pageSize={courses?.meta.limit as number}
          totalCount={courses?.meta.total as number}
          currentPage={params.page !== '' ? parseInt(params.page) : 1}
          onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </Container>
  )
}
