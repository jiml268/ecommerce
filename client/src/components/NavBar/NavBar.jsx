import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import css  from './navBar.module.css'
import { useAuth } from '../../hooks/userHooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoggedOut } from '../../redux/user/userSlice'
import { deleteUser } from '../../redux/user/userOperators';

function NavBar() {
  const dispatch = useDispatch()
  const { loggedIn, getUserEmail } = useAuth();
  const navigate = useNavigate();  

  const pages = !loggedIn?['Sign In', 'Register']:['Sign Out', 'Cart', 'Account', 'Delete Account'];
     const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
switch(e.target.value) {
  case "Register":
    navigate("/registration")
    break;
  case "Sign In":
    navigate("/signIn")
    break;
  case "Sign Out":
    dispatch(LoggedOut(false))
    break
  case "Delete Account":
    dispatch(deleteUser({ email: getUserEmail }))
    dispatch(LoggedOut(false))
    navigate('/')
    break
 default:
    navigate("/")
}

   
  };


  return (
    <div className={css.navbar}>
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
                <MenuItem value={page} key={page} onClick={handleCloseNavMenu} >
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
            {pages.map((page) => (
              <Button
                key={page}
                value={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            
        </Toolbar>
      </Container>
      </AppBar>
      </div>
  );
}

export default NavBar