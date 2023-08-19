import MainLayout from "@/layout"
import { RouteObject } from "react-router"
// import { lazy } from "react"
import { CustomRouter } from "../types"
import GptView from "@/pages/GptView"
import OpencvView from "@/pages/OpencvView"
import CustomView from "@/pages/CustomView"

export const mainMenuRoutes: CustomRouter[] = [
  {
    id: 'GPT',
    path: '/',
    label: 'GPT',
    Component: GptView,
  }, {
    id: 'OpencvView',
    path: 'opencv',
    label: 'OPENCV',
    Component: OpencvView
  }, {
    id: 'CustomView',
    path: 'custom',
    label: 'CUSTOM',
    Component: CustomView
  }
]

export const mainRouters: RouteObject = {
  id: 'main',
  path: '/',
  Component: MainLayout,
  children: mainMenuRoutes
}
