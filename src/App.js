import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home.js";
import SignUp from "./containers/SignUp";
import Header from "./components/Header";
import Offer from "./containers/Offer.js";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header></Header>

        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>

          <Route path="/signUp">
            <SignUp />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
