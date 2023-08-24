import { MenuItemProps } from "../types"
import { Link, useMatches } from "react-router-dom"
export default function MenuItem(props: MenuItemProps) {
  const path = props.to || props.path || '/'
  return (
    <Link className={`${SomeComp(props.path)} px-3 py-2 hover:bg-[--theme-active-menu-bg-color] hover:text-[--theme-active-menu-font-color] h-full inline-block`} to={path} state={path}>
      { props.label }
    </Link>
  )
}

function SomeComp(path = "/") { 
  const matchs = useMatches()
  const match = matchs.find(match => {    
    return match.pathname === '/' + path 
  })
  return match ? "active" : ""
}