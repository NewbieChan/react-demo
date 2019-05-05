// import { lazy } from 'react';

import LogIn from '../pages/login';
import Blog from '../pages/blog';
import BlogDetail from '../pages/blog/Detail';
import BlogForm from '../pages/blog/BlogForm';

export default [
  {
    path: '/login',
    component: LogIn,
  },
  {
    path: '/blog',
    children: [
      {
        path: '',
        component: Blog,
      },
      {
        path: '/add',
        component: BlogForm
      },
      {
        path: '/:id/edit',
        component: BlogForm,
      },
      {
        path: '/:id',
        component: BlogDetail,
      },
    ],
  },
]
