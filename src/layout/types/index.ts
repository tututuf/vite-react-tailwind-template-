import { ReactNode } from "react"

export interface MenuItemProps{
  label: string
  path?: string
}

export interface MainLayoutProps{
  children?: ReactNode
}
