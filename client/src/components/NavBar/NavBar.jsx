import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useAuth } from '../../hooks/userHooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoggedOut } from '../../redux/user/userSlice'
import { deleteUser } from '../../redux/user/userOperators';
import { useCart } from '../../hooks/cartHooks';

function NavBar() {
   const dispatch = useDispatch()
  const { loggedIn, getUserEmail } = useAuth();
  const { getCurrentCart } = useCart()  
  const nav = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = !loggedIn?['Sign In', 'Register', 'Cart', ]:['Sign Out', 'Cart', "Orders", 'All cards'];
const settings = ['Update Profile', 'Change Password', 'Delete Account'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
     const { myValue } = e.currentTarget.dataset;
   
switch(myValue) {
  case "Register":
    nav("/registration")
    break;
  case "Sign In":
    nav("/signIn")
    break;
  case "Sign Out":
    dispatch(LoggedOut(false))
    nav("/")
    break
  case "Cart":
    {
      getCurrentCart ?
        nav("/cart") :
        nav("/emptyCart") 
    } 
    break
   case "Orders":
    nav("/allorders")
    break
    case "All cards":
    nav("/cardList")
    break
 default:
    nav("/")
}
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
 const { myValue } = event.currentTarget.dataset;
       
        switch (myValue) {
            case "Delete Account":
                if (loggedIn) {
                    dispatch(deleteUser({ email: getUserEmail }))
                    dispatch(LoggedOut(false))
                    nav('/')
                }
                break
            case "Change Password":
                nav("/changepassword")
                break
            case "Update Profile":
                nav("/userprofile")
                break;
            default:
                nav("/")
        }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem data-my-value={page} key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                data-my-value={page}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {loggedIn &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
              
                <AccountCircle onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </AccountCircle>
              
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} data-my-value={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;