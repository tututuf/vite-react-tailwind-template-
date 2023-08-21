import { MenuItemProps } from "../types"
import { Link } from "react-router-dom"
import { useMatch } from "react-router-dom";

export default function MenuItem(props: MenuItemProps) {
  const path = props.path || '/'
  return (
    <Link className={`${SomeComp(path)} px-3 py-2 hover:bg-[--theme-active-menu-bg-color] hover:text-[--theme-active-menu-font-color] h-full inline-block`} to={path}>
      { props.label }
    </Link>
  )
}

function SomeComp(path: string) {
  const match = useMatch(path);
  return match ? "active" : ""
}