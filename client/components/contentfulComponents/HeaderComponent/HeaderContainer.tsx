import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { getImageTitle, getImageUrl } from "../../../util/commonFunctions";
import Header from "./Header";
import Auth from "../../auth/Auth";

const HeaderContainer = (element: any) => {
  // Destructure properties from the 'element' object
  const { logo, productNames } = element;

  // Define Home and Cart tab configurations
  const HomeTab = { name: "Home", redirectionUrl: "/" };
  const CartTab = { name: "Cart", redirectionUrl: "/cart" };

  // State to manage the navigation menu
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  // Handle opening the navigation menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // Handle closing the navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" className="!bg-slate-800">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
          >
            <img
              src={getImageUrl(logo)}
              className="w-16 p-2.5"
              alt={getImageTitle(logo)}
            />
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
              <Header {...HomeTab} isMobile />
              {productNames?.map((element: any, index: number) => {
                return (
                  <div key={index}>
                    <Header
                      isMobile
                      {...element?.fields}
                      productId={element?.sys?.id}
                      handleCloseNavMenu={handleCloseNavMenu}
                    />
                  </div>
                );
              })}
              <Header {...CartTab} isMobile />
            </Menu>
          </Box>
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
          >
            <img
              src={getImageUrl(logo)}
              className="w-16 p-2.5"
              alt={getImageTitle(logo)}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Header {...HomeTab} />
            {productNames?.map((element: any, index: number) => {
              return (
                <Header
                  key={index}
                  {...element?.fields}
                  productId={element?.sys?.id}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              );
            })}
            <Header {...CartTab} />
          </Box>

          <Auth />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderContainer;
