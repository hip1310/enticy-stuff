import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useUser } from "@auth0/nextjs-auth0/client";
import { post } from "../../services/axiosAPI";
import { clearAllData, saveUser } from "../../util/commonFunctions";

const Auth = () => {
  const { user } = useUser();

  useEffect(() => {
    // Check if the user is authenticated and send their data to the server
    if (user) {
      try {
        post("/user/create", user).then((response) => {
          if (Object.keys(response?.data)?.length > 0) {
            saveUser(response?.data);
          }
        });
      } catch (error) {
        // Handle the error
        console.error("Error creating user:", error);
      }
    }
  }, [user]);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    // Open the user menu when the user clicks on their profile
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    // Close the user menu
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        {user ? (
          <>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Display user's profile picture */}
                <Avatar alt="profile" src={user?.picture || ""} />
              </IconButton>
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
              <MenuItem key={"order"} onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    // Navigate to the user's orders
                    window.location.href = "/orders";
                  }}
                >
                  Orders
                </Typography>
              </MenuItem>
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <a
                  href="/api/auth/logout"
                  onClick={() => {
                    // Log out the user and clear data
                    clearAllData();
                  }}
                >
                  Log Out
                </a>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <a
            href="/api/auth/login"
            onClick={() => {
              // Clear data and initiate login or registration
              clearAllData();
            }}
            className="p-2.5 cursor-pointer w-36 rounded-md mb-0"
          >
            Log In | Sign Up
          </a>
        )}
      </Box>
    </>
  );
};

export default Auth;
