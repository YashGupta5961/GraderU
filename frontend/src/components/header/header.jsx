import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import api from "../../utils/api";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.get("/users/logout");
    } catch (err) {
      console.log(err);
    }
    setAnchorEl(null);
  };

  return (
    <div className="app-header">
      <div className="header-row-1">
        <div className="app-header-title">
          <img className="logo" src={logo} alt="logo" />
          <p>GraderU</p>
        </div>

        <Button
          className="app-header-profile-btn"
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
          id="user-button"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <img className="profile-img" src={profile} alt="profile-button" />
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "user-button",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/verify");
            }}
          >
            Verify
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>

      <div className="app-header-btns">
        <button className="home-btn">Home</button>
        <button className="calculator-btn">Grade Calculator</button>
      </div>
    </div>
  );
}

export default Header;
