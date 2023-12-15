import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState } from "react";

const Product = (element: any) => {
  // Destructure properties from the 'element' object
  const { name, redirectionUrl, products, isMobile } = element;

  // State to manage the menu anchor element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Determine whether the menu is open
  const open = Boolean(anchorEl);

  // Handle button click to open the menu and navigate if redirection URL is provided
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (redirectionUrl) {
      window.location.href = redirectionUrl;
    }
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={isMobile ? "!text-black" : "!text-white"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        {name}
      </Button>

      {products && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {products.map((productElement: any, index: number) => {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  window.location.href = "/";
                }}
              >
                {productElement?.fields?.name}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </>
  );
};

export default Product;
