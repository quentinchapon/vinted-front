import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./containers/Home.js";
import SignIn from "./containers/SignIn";
import Header from "./components/Header";
import Offer from "./containers/Offer.js";
import Footer from "./components/Footer";
import ModalSignUp from "./components/ModalSignUp";
import ModalSignIn from "./components/ModalSignIn";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [displayModalSignUp, setDisplayModalSignUp] = useState(false);
  const [displayModalSignIn, setDisplayModalSignIn] = useState(false);

  // Fonction de création du cookie
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 7,
      });

      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <ModalSignIn
        displayModalSignUp={displayModalSignUp}
        displayModalSignIn={displayModalSignIn}
        setUser={setUser}
        setDisplayModalSignUp={setDisplayModalSignUp}
        setDisplayModalSignIn={setDisplayModalSignIn}
      />
      <ModalSignUp
        displayModalSignUp={displayModalSignUp}
        displayModalSignIn={displayModalSignIn}
        setUser={setUser}
        setDisplayModalSignUp={setDisplayModalSignUp}
        setDisplayModalSignIn={setDisplayModalSignIn}
      />
      <div className="wrapper">
        <Header
          userToken={userToken}
          setUser={setUser}
          setDisplayModalSignUp={setDisplayModalSignUp}
          setDisplayModalSignIn={setDisplayModalSignIn}
          displayModalSignUp={displayModalSignUp}
          displayModalSignIn={displayModalSignIn}
        ></Header>

        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>

          <Route path="/signIn">
            <SignIn setUser={setUser} />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
