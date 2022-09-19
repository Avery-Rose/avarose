import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
  Tooltip,
} from '@mui/material';
import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Login from '@mui/icons-material/Login';
import { UserContext } from '../../context/UserContext';
import { logout, signInWithGoogle } from '../../util/firebaseFunctions';

// react icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useContext(UserContext);

  const Logo = ({ isMobile }) => {
    return (
      <Typography
        variant='h6'
        noWrap
        component='h1'
        sx={{
          cursor: 'pointer',
          flexGrow: 1,
          mr: 2,
          display: {
            xs: isMobile ? 'flex' : 'none',
            md: isMobile ? 'none' : 'flex',
          },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}>
        <Link className='logo' to='/'>
          &lt;AvaRose/&gt;
        </Link>
      </Typography>
    );
  };
  const navigate = useNavigate();
  // const location = useLocation();

  const [, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogin = () => {
    signInWithGoogle()
      .then(() => {
        enqueueSnackbar('Logged in successfully', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  const pages = [];
  const settings = [
    {
      title: 'Profile',
      icon: <AccountCircleIcon />,
      action: () => {
        handleCloseUserMenu();
        enqueueSnackbar('Profile is not implemented yet', {
          variant: 'info',
        });

        navigate('/profile/' + user.uid);
      },
    },
    {
      title: 'Logout',
      icon: <AccountCircleIcon />,
      action: () => {
        logout();
        enqueueSnackbar('Logged out successfully', {
          variant: 'success',
        });
        handleCloseUserMenu();
      },
    },
  ];

  return (
    <AppBar
      position='absolute'
      style={{
        height: '64px',
      }}
      color='primary'
      enableColorOnDark>
      <Container maxWidth='xl'>
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
          </Box>
          <Logo isMobile />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user.photoURL && (
                    <Avatar
                      srcSet={user.photoURL ?? user.photoURL}
                      imgProps={{
                        loading: 'lazy',
                        referrerPolicy: 'no-referrer',
                      }}
                      alt={user.displayName}
                      src={user.photoURL ?? user.photoURL}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={setting.action}>
                    <Typography textAlign='center'>{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Login'>
                <IconButton onClick={handleLogin} sx={{ p: 1 }}>
                  <Login sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
