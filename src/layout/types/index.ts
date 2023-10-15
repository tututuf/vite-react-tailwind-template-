import { ReactNode } from 'react';
import { CustomRouter } from '@/router/types';

export type MenuItemProps = CustomRouter;

export interface MainLayoutProps {
  children?: ReactNode;
}
