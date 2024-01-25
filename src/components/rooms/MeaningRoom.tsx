import { meaningRoom } from '@/lib/constant'
import { cn } from '@/lib/utils'

const MeaningRoom = () => {
  return (
    <>
      {meaningRoom.map((item) => (
        <div className="flex gap-4 items-center" key={item.id}>
          <div className={cn(`w-[39px] h-[39px] ${item.className}`)}></div>
          <span className="font-medium text-base text-black">
            {item.content}
          </span>
        </div>
      ))}
    </>
  )
}

export default MeaningRoom
