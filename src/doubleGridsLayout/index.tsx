import LeftSide from "./leftSide"
import RightSide from "./rightSide"

export default function DoubleGirdsLayout() {
  return (
    <div className="w-full h-full flex">
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
  )
}