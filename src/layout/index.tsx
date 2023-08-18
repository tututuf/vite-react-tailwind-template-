import Menu from "./Menu"
import Main from "./Main"
import { Outlet } from "react-router"
import { Suspense } from "react"

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Menu></Menu>
      <Main>
        <Suspense>
          <Outlet></Outlet>
        </Suspense>
      </Main>
    </div>
  )
}