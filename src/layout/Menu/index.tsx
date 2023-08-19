import { mainMenuRoutes } from "@/router/mainRouter"
import MenuItem from "./menuItem"

export default function Menu() {
  return (
    <header className="w-screen bg-[--theme-menu-bg-color]">
      {
        mainMenuRoutes.map((router, index) => {
          return(
            <MenuItem label={router.label} path={router.path} key={index}></MenuItem>
          )
        })
      }
    </header>
  )
}