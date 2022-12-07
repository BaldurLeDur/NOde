import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from "./components/Menu";



//App.js
function App(props){
  return <Router>
      <Switch>
        <Route exact path="/"> {/*ici on met l'URL dans le navigateur*/}
          <Menu /> {/*ici on donne la page à afficher en fonction de cette URL*/}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
  </Router>
}



export default App;
