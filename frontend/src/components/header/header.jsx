import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import api from "../../utils/api";
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
                    <Typography component="h1" variant="h2"
                        sx={{
                            color: 'black',
                        }}
                    >
                        GraderU
                    </Typography>
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
                <button className="home-btn"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Home
                    </Typography>
                </button>
                <button className="calculator-btn"
                    onClick={() => {
                        navigate("/GPA-calculator");
                    }}
                >
                    <Typography component="h1" variant="h5">
                        GPA Calculator
                    </Typography>
                </button>
            </div>
        </div>
    );
}

export default Header;