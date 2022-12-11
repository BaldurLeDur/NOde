import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import YourPolidex from "./pages/YourPolidex";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Everyone from './pages/Everyone';





//App.js
function App(props){
  return <Router>
      <Switch>
        <Route exact path="/"> {/*ici on met l'URL dans le navigateur*/}
          <Home /> {/*ici on donne la page à afficher en fonction de cette URL*/}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/YourPolidex">
          <YourPolidex />
        </Route>
        <Route path="/everyone">
          <Everyone />
        </Route>
      </Switch>
  </Router>
}



export default App;
