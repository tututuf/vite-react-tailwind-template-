import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

export default function GptView() {
  return (
    <div className="p-3 w-full h-full drop-shadow-lg">
      <div className="bg-[--theme-bg-color] w-full h-full flex rounded-xl overflow-auto">
        <LeftSide></LeftSide>
        <RightSide></RightSide>
      </div>
    </div>
  )
}