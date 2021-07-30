import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Modal = ({ displayModal, setUser }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
        newUser
      );
      // Si réponse avec token on envoi token dans la fonction setUser (dans App.js) qui va créer le cookie
      if (response.data.token) {
        setUser(response.data.token);
        history.go(-1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if (displayModal === true) {
    return (
      <div className="panels">
        <div className="link back-link">
          <span>&#60; Back</span>
        </div>
        <div className="left-panel">
          <div className="sign-up-module">
            <div className="logo-main">
              <div className="logo-almost">
                <p>(almost)</p>
              </div>
              <div className="logo-vinted">
                <p>
                  Vinted<span> .</span>
                </p>
              </div>
            </div>
            <h4>Sign up</h4>
            <p className="lorem">
              Nam convallis dictum lectus a malesuada. Vestibulum sagittis dui
              eget felis tempor aliquet.
            </p>
            <form
              action=""
              method="get"
              className="form-sign text-field-main"
              onSubmit={handleSubmit}
            >
              <div className="form-sign-up">
                <label className="form-label" htmlFor="name">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  className="username"
                  required
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form-sign-up">
                <label className="form-label" htmlFor="email">
                  E-mail adresse *
                </label>
                <input
                  type="email"
                  name="email"
                  className="email"
                  required
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-sign-up">
                <label className="form-label" htmlFor="password">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  className="password"
                  required
                  onChange={handlePasswordChange}
                />
              </div>

              <button className="button-primary" type="submit" value="Sign in">
                Sign up
              </button>
            </form>
            <div className="hor-separator"></div>
            <div className="already-signed link">
              <Link to="/SignIn">
                <span>Already a member ? Sign in !</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="right-panel"></div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
