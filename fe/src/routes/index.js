import LogIn from '../pages/login';
import Blog from '../pages/blog';
import BlogDetail from '../pages/blog/Detail';
import BlogForm from '../pages/blog/BlogForm';
import Register from '../pages/register';
import MemberList from '../pages/member';

export default [
  {
    path: '/register',
    component: Register,
  },
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
  {
    path: '/member',
    component: MemberList, 
  }
];

