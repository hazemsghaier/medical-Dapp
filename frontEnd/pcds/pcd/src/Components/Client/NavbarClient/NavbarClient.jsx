import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarClientMenuItems } from './NavbarClientMenuItems';
import { useNavigate } from 'react-router-dom';
import {logout} from "../../../api/authApi"

const NavbarClient = () => {
    const [clicked, setClicked] = useState(false);
    const navigate=useNavigate();

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLogout = async () => {
        const result =await logout();
        if(result){
            navigate("/")
        }else{
            console.log(11111)
        }
     
    }

    return (
        <nav className="NavbarItems">
            <h1 className='navbar-logo'>MindVista</h1>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                {NavbarClientMenuItems.map((item, index) => (
                    <li key={index}>
                        {item.title === "Log Out" ? (
                            <Link className={item.cName} to={item.url} onClick={handleLogout}>
                                <i className={item.icon}></i> {item.title}
                            </Link>
                        ) : (
                            <Link className={item.cName} to={item.url}>
                                <i className={item.icon}></i> {item.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavbarClient;
