import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Modal, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../../hooks/userHooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoggedOut } from "../../redux/user/userSlice";
import { deleteUser } from "../../redux/user/userOperators";
import { useCart } from "../../hooks/cartHooks";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NavBar() {
  const dispatch = useDispatch();
  const { loggedIn, getUserEmail, getUserId } = useAuth();
  const { getCurrentCart } = useCart();
  const nav = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const pages = !loggedIn
    ? ["Sign In", "Register", "Cart"]
    : ["Sign Out", "Cart"];
  const settings = [
    "Update Profile",
    "Change Password",
    "Orders",
    "Saved Cards",
    "Delete Account",
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    const { myValue } = e.currentTarget.dataset;

    switch (myValue) {
      case "Register":
        nav("/registration");
        break;
      case "Sign In":
        nav("/signIn");
        break;
      case "Sign Out":
        dispatch(LoggedOut(false));
        nav("/");
        break;
      case "Cart":
        {
          getCurrentCart ? nav("/cart") : nav("/emptyCart");
        }
        break;
      case "home":
        nav("/");
        break;
      default:
        nav("/");
    }
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    const { myValue } = event.currentTarget.dataset;

    switch (myValue) {
      case "Delete Account":
        setDeleteOpen(true);
        break;
      case "Change Password":
        nav("/changepassword");
        break;
      case "Update Profile":
        nav("/userprofile");
        break;
      case "Saved Cards":
        nav("/cardList");
        break;
      case "Orders":
        nav("/allorders");
        break;
      default:
        nav("/");
    }
  };

  const handleDeleteClose = async (e) => {
    setDeleteOpen(false);
    console.log();
    if (e.target.value === "yes") {
      if (loggedIn) {
        dispatch(deleteUser({ email: getUserEmail, id: getUserId }));
        dispatch(LoggedOut(false));
        nav("/");
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              data-my-value="home"
              onClick={handleCloseNavMenu}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    data-my-value={page}
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              data-my-value="home"
              onClick={handleCloseNavMenu}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  data-my-value={page}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {loggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <AccountCircle onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </AccountCircle>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      data-my-value={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="modal-delete-account"
        aria-describedby="modal-delete-user-account"
      >
        <Box sx={style}>
          <Typography id="modal-delete-account" variant="h6" component="h2">
            Are you sure you want to delete this account
          </Typography>
          <Typography id="modal-delete-user-account" sx={{ mt: 2 }}>
            All previous orders will be lost <br />
          </Typography>
          <Button onClick={handleDeleteClose} name="yes" value="yes">
            Yes
          </Button>
          <Button onClick={handleDeleteClose} name="no" value="no">
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default NavBar;
