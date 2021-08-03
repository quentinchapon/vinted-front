import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Home from "./containers/Home.js";
import Header from "./components/Header";
import Offer from "./containers/Offer.js";
import Footer from "./components/Footer";
import ModalSignUp from "./components/ModalSignUp";
import ModalSignIn from "./components/ModalSignIn";
import ModalPublish from "./components/ModalPublish";
import ModalPayment from "./components/ModalPayment";
const stripePromise = loadStripe(
  "pk_test_51JKMzqFoOQI89P8BWtoOpsG4uTo3AKxgp5VgFpcXwblWCVS4MFL0IWZMNAfEUQOPgzhepSCeICztudRfoCZIR8Y9009b2KLr6t"
);
function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [displayModalSignUp, setDisplayModalSignUp] = useState(false);
  const [displayModalSignIn, setDisplayModalSignIn] = useState(false);
  const [displayModalPublish, setDisplayModalPublish] = useState(false);
  const [displayModalPayment, setDisplayModalPayment] = useState(false);
  const [username, setUsername] = useState();

  //Fonction scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      <ModalPublish
        userToken={userToken}
        displayModalSignUp={displayModalSignUp}
        displayModalSignIn={displayModalSignIn}
        displayModalPublish={displayModalPublish}
        setUser={setUser}
        setDisplayModalSignUp={setDisplayModalSignUp}
        setDisplayModalSignIn={setDisplayModalSignIn}
        setDisplayModalPublish={setDisplayModalPublish}
        setUsername={setUsername}
      />
      <ModalSignIn
        displayModalSignUp={displayModalSignUp}
        displayModalSignIn={displayModalSignIn}
        displayModalPublish={displayModalPublish}
        setUser={setUser}
        setDisplayModalSignUp={setDisplayModalSignUp}
        setDisplayModalSignIn={setDisplayModalSignIn}
        setDisplayModalPublish={setDisplayModalSignIn}
        setUsername={setUsername}
      />
      <ModalSignUp
        displayModalSignUp={displayModalSignUp}
        displayModalSignIn={displayModalSignIn}
        displayModalPublish={displayModalSignIn}
        setUser={setUser}
        setDisplayModalSignUp={setDisplayModalSignUp}
        setDisplayModalSignIn={setDisplayModalSignIn}
        setDisplayModalPublish={setDisplayModalSignIn}
      />
      <Elements stripe={stripePromise}>
        <ModalPayment
          displayModalPayment={displayModalPayment}
          setDisplayModalPayment={setDisplayModalPayment}
        />
      </Elements>
      <div className="wrapper">
        <Header
          username={username}
          userToken={userToken}
          setUser={setUser}
          cookies={Cookies}
          setUserToken={setUserToken}
          setDisplayModalSignUp={setDisplayModalSignUp}
          setDisplayModalSignIn={setDisplayModalSignIn}
          setDisplayModalPublish={setDisplayModalPublish}
          displayModalSignUp={displayModalSignUp}
          displayModalSignIn={displayModalSignIn}
          displayModalPublish={displayModalPublish}
        ></Header>

        <Switch>
          <Route path="/offer/:id">
            <Offer
              scrollToTop={scrollToTop}
              setDisplayModalPayment={setDisplayModalPayment}
              displayModalPayment={displayModalPayment}
            />
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
