import { lazy } from 'react';
import { CustomRouter } from '../types';

export const MediaRouter: CustomRouter[] = [
  {
    path: 'vod',
    Component: lazy(() => import('@/pages/MediaPage/Vod')),
    label: '点播'
  },
  {
    path: 'live_streaming',
    Component: lazy(() => import('@/pages/MediaPage/LiveStreaming')),
    label: '直播'
  },
  {
    path: 'video_call',
    Component: lazy(() => import('@/pages/MediaPage/VideoCall')),
    label: '共享视频'
  }
];
