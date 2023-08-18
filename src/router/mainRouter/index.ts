import MainLayout from "@/layout"
import { RouteObject } from "react-router"
import { lazy } from "react"
import { CustomRouter } from "../types"

export const mainMenuRoutes: CustomRouter[] = [
  {
    id: 'GPT',
    index: true,
    label: 'GPT',
    Component: lazy(() => import('@/pages/GptView'))
  }, {
    id: 'OpencvView',
    path: 'opencv',
    label: 'OPENCV',
    Component: lazy(() => import('@/pages/OpencvView'))
  }, {
    id: 'CustomView',
    path: 'custom',
    label: 'CUSTOM',
    Component: lazy(() => import('@/pages/CustomView'))
  }
]

export const mainRouters: RouteObject = {
  id: 'main',
  path: '/',
  Component: MainLayout,
  children: mainMenuRoutes
}
