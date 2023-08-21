import LeftSide from "./LeftSide"
import RightSide from "./RightSide"

export default function GptView() {
  return (
    <div className="w-full h-full flex">
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
  )
}