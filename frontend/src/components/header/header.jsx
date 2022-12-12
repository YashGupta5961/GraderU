import React from 'react'
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import './header.css'
function Header() {
    return (
        <div className="app-header">
            <div className="header-row-1">
                <div className="app-header-title">
                    <img className="logo" src={logo} alt="logo" />
                    <p>GraderU</p>
                </div>

                <button className="app-header-profile-btn">
                    <img
                        className="profile-img"
                        src={profile}
                        alt="profile-button"
                    />
                </button>
            </div>

            <div className="app-header-btns">
                <button className="home-btn">Home</button>
                <button className="calculator-btn">Grade Calculator</button>
            </div>
        </div>
    )
}

export default Header