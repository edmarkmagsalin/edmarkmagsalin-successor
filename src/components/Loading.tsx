import { LoaderCircle } from 'lucide-react'

export const Loading = ({text}: {text?: string}) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <LoaderCircle size={15} className="animate-spin" />{text && text}
    </div>
  )
}