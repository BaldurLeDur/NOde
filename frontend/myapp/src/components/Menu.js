import {
    Link
  } from "react-router-dom";

function Menu(){
    return <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/YourPolidex">Your Polidex</Link></li>
            <li><Link to="/everyone">everyone here</Link></li>
        </ul>
    </nav>
};

export default Menu;