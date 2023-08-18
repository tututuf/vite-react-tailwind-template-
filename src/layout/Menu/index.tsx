import { mainMenuRoutes } from "@/router/mainRouter"
import MenuItem from "./menuItem"

export default function Menu() {
  return (
    <header className="w-screen bg-[--theme-bg-color]">
      {
        mainMenuRoutes.map(router => {
          return(
            <MenuItem label={router.label} path={router.path}></MenuItem>
          )
        })
      }
    </header>
  )
}