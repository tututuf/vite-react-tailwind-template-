import MainLayout from '@/layout';
import { RouteObject } from 'react-router';
// import { lazy } from "react"
import { CustomRouter } from '../types';
import { Navigate } from 'react-router';
import GptView from '@/layout/GptView';
import OpencvView from '@/layout/OpencvView';
import CustomView from '@/layout/CustomView';
import { createRef, lazy } from 'react';

export const mainMenuRoutes: CustomRouter[] = [
  {
    id: 'GPT',
    path: 'Gpt',
    label: 'GPT',
    element: <GptView />,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/GptPage'))
      },
      {
        path: ':gptId',
        Component: lazy(() => import('@/pages/GptPage'))
      }
    ],
    nodeRef: createRef()
  },
  {
    id: 'OpencvView',
    path: 'opencv',
    label: 'OPENCV',
    element: <OpencvView />,
    nodeRef: createRef()
  },
  {
    id: 'CustomView',
    path: 'custom',
    label: 'CUSTOM',
    element: <CustomView />,
    nodeRef: createRef()
  }
];

export const mainRouters: RouteObject = {
  path: '/main',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="/main/Gpt"></Navigate>
    },
    ...mainMenuRoutes
  ]
};
