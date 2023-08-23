import MainLayout from "@/layout"
import { RouteObject } from "react-router"
// import { lazy } from "react"
import { CustomRouter } from "../types"
import { Navigate } from "react-router"
import GptView from "@/layout/GptView"
import OpencvView from "@/layout/OpencvView"
import CustomView from "@/layout/CustomView"
import { lazy } from "react"

export const mainMenuRoutes: CustomRouter[] = [
  {
    id: 'GPT',
    path: 'Gpt',
    label: 'GPT',
    Component: GptView,
    children: [
      {
        index: true,
        Component: lazy(() => import("@/pages/GptPage"))
      }, {
        path: ':gptId',
        Component: lazy(() => import("@/pages/GptPage"))
      }
    ]
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
  children: [
    { 
      index: true,
      element: <Navigate to='/Gpt'></Navigate>
    },
    ...mainMenuRoutes
  ]
}
