import { RouteObject } from "react-router"

export type CustomRouter = RouteObject & {
  id: string
  label: string
  redirect?: string
  // path: string
}