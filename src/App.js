import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GeneralKnowledge from "./GeneralKnowlegde";
import Mythology from "./Mythology";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/general_Knowledge" component={GeneralKnowledge} />
          <Route path="/mythology" component={Mythology} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
