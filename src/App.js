import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./containers/Home.js";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Header from "./components/Header";
import Offer from "./containers/Offer.js";
import Footer from "./components/Footer";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  // Fonction de création du cookie
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 7,
        sameSite: "none",
        secure: true,
      });

      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <div className="wrapper">
      <Router>
        <Header userToken={userToken} setUser={setUser}></Header>

        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>

          <Route path="/signUp">
            <SignUp setUser={setUser} />
          </Route>

          <Route path="/signIn">
            <SignIn setUser={setUser} />
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
