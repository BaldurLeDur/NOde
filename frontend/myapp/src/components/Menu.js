import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Menu(){
    return <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Dashboard</Link></li>
            <li><Link to="/dashboard">About</Link></li>
        </ul>
    </nav>
};

export default Menu;