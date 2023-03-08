import RequiredAuthState from '../Navbar/types/RequiredAuthState';

import Home from '../../Pages/Home';
import Discord from '../../Pages/Discord';
import NotFound from '../../Pages/NotFound';
import Unauthorized from '../../Pages/Unauthorized';

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
