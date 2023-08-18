import { MenuItemProps } from "../types"
import { Link } from "react-router-dom"

export default function MenuItem(props: MenuItemProps) {
  return (
    <Link className="px-3 py-2 hover:bg-[--theme-active-bg-color] hover:text-[--theme-active-font-color] h-full inline-block" to={props.path || '/'}>
      { props.label }
    </Link>
  )
}