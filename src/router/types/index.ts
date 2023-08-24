import { RefObject } from "react"
import { RouteObject } from "react-router"

export type CustomRouter = RouteObject & {
  label: string
  redirect?: string
  to?: string         // 动态路由使用，菜单路由的路径
  nodeRef?: RefObject<HTMLElement>
}
