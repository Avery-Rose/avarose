import RequiredAuthState from '../Navbar/types/RequiredAuthState';

import Home from '../../Pages/Home';
import Discord from '../../Pages/Discord';
import NotFound from '../../Pages/NotFound';
import Unauthorized from '../../Pages/Unauthorized';
import Cats from '../../Pages/Cats';

const Routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    reqAuthState: RequiredAuthState.Any,
    hidden: false,
  },
  {
    path: '/discord',
    name: 'Discord',
    component: Discord,
    reqAuthState: RequiredAuthState.Any,
    hidden: false,
  },
  {
    path: '/cats',
    name: 'Cats',
    component: Cats,
    reqAuthState: RequiredAuthState.LoggedIn,
    hidden: true,
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
    reqAuthState: RequiredAuthState.LoggedOut,
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    reqAuthState: RequiredAuthState.Any,
    hidden: true,
  },
];

export default Routes;
