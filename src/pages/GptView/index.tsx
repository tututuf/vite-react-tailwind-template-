import LeftSide from "@/doubleGridsLayout/leftSide"
import RightSide from "@/doubleGridsLayout/rightSide"

export default function GptView() {
  return (
    <div className="w-full h-full flex">
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
  )
}