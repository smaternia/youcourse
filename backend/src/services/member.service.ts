import db from '../utils/db'

export const getMemberByUserIdAndForumId = async (userId: string, courseId: string) => {
  return await db.course.findUnique({
    where: { id: courseId },
    include: {
      members: {
        where: { user_id: userId }
      }
    }
  })
}
