import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const ModalSignIn = ({ displayModal, setUser, setDisplayModal }) => {
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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const user = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://quentin-vinted-backend.herokuapp.com/login",
        user
      );
      console.log(response.data);
      if (response.data.token) {
        // Création du cookie avec le token
        setUser(response.data.token);
        setDisplayModal(false);

        // Rediriger l'utilisateur vers la page ou il se trouvait précédement
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <h4>Sign in</h4>
          <p className="lorem">
            Nam convallis dictum lectus a malesuada. Vestibulum sagittis dui
            eget felis tempor aliquet.
          </p>
          <form
            action=""
            method="get"
            className="form-sign text-field-main "
            onSubmit={handleSubmit}
          >
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
              Sign in
            </button>
          </form>
          <div className="hor-separator"></div>
          <div className="already-signed link">
            <Link to="/SignUp">
              <span>Not a member yet ? Sign up</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="right-panel"></div>
    </div>
  );
};

export default ModalSignIn;
