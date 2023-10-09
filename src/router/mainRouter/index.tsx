import MainLayout from '@/layout';
import { RouteObject } from 'react-router';
import { CustomRouter } from '../types';
import { Navigate } from 'react-router';
import { MediaRouter } from './mediaRouter';
import GptView from '@/layout/GptView';
import OpencvView from '@/layout/OpencvView';
import CustomView from '@/layout/CustomView';
import MediaPage from '@/pages/MediaPage';

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
    id: 'MediaView',
    path: 'media',
    label: 'Media',
    element: <MediaPage />,
    nodeRef: createRef(),
    children: [
      {
        index: true,
        element: <Navigate to="/main/media/vod"></Navigate>
      },
      ...MediaRouter
    ]
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
