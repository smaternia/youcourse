import { More } from '@/components/atoms'
import { CommentType } from '@/lib/types/comment.type'
import { formatDate } from '@/lib/utils'
import { useComment, useDialog, useUserInfo } from '@/store/client'
import { useDeleteComment } from '@/store/server/useComment'

interface CommentCardProps {
  comment: CommentType
}

export default function CommentCard({ comment }: CommentCardProps) {
  const { dialog } = useDialog()
  const user = useUserInfo((state) => state.user)
  const setComment = useComment((state) => state.setComment)

  const { mutateAsync: deleteComment, isLoading } = useDeleteComment()

  const handleDelete = () => {
    dialog({
      title: 'Delete Comment',
      description: 'Are you sure you want to delete this comment?',
      submitText: 'Delete',
      variant: 'danger',
      isLoading
    }).then(async () => {
      await deleteComment(comment.id)
    })
  }

  return (
    <article className="flex items-start">
      <div className="flex h-8 w-8 overflow-hidden rounded-full border-2 md:mr-3">
        <img src="https://github.com/shadcn.png" alt="profile" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 border-b-2 border-slate-200 pb-3 md:pb-4">
        <div className="flex h-8 w-full items-center justify-between md:h-8">
          <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-2">
            <div className="text-[13px] font-semibold hover:text-primary md:text-[15px]">
              <p className="w-max">{comment.user.fullname}</p>
            </div>
            <span className="text-xs text-font/60 md:text-sm">&bull;</span>
            <span className="text-xs text-font/60 md:text-sm">{formatDate(comment.created_at, 'without-hour')}</span>
          </div>
          {user?.id === comment.user.id && (
            <More>
              <More.Item type="edit" onClick={() => setComment({ id: comment.id, content: comment.content })} />
              <More.Item type="delete" onClick={handleDelete} />
            </More>
          )}
        </div>
        <p className="text-[13px] md:text-sm">{comment.content}</p>
      </div>
    </article>
  )
}
