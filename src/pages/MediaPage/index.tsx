// import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { MediaRouter } from '@/router/mainRouter/mediaRouter';
import { Suspense } from 'react';
export default function MediaPage() {
  return (
    <div className="h-full w-full bg-gray-100 flex">
      <div className="h-full bg-gray-600">
        {MediaRouter.map((router, index) => {
          return (
            <Link
              key={index}
              to={router.path ?? '/'}
              className="block w-[13rem] p-3 bg-gray-700 text-slate-300 hover:bg-gray-800 hover:text-slate-200 text-sm"
            >
              {router.label}
            </Link>
          );
        })}
      </div>
      <div className="m-3 p-6 rounded-md bg-gray-400 w-full">
        <Suspense>
          <Outlet></Outlet>
        </Suspense>
      </div>
    </div>
  );
}
