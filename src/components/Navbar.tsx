import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { pages } from "../configs/pages";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "grey.400" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            dotcode
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <IconButton
              size="large"
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button
                    component={NavLink}
                    to={`/${page}`}
                    sx={{
                      color: "#000000DE",
                      "&.active": {
                        backgroundColor: "action.selected",
                      },
                    }}
                  >
                    {page}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            dotcode
          </Typography>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, gap: 1 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                component={NavLink}
                to={`/${page}`}
                onClick={handleCloseNavMenu}
                sx={{
                  display: "block",
                  my: 2,
                  color: "white",
                  "&.active": {
                    backgroundColor: "action.selected",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
