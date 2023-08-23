import { Outlet } from "react-router"
import { Suspense } from "react"
export default function RightSide() {
  return (
    <div className="flex-1 overflow-auto">
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}