import { Link } from "react-router-dom";
// import Search from "../img/ic_search.svg";

const Header = ({
  userToken,
  setUser,
  setDisplayModalSignUp,
  setDisplayModalSignIn,
  displayModalSignUp,
  displayModalSignIn,
}) => {
  return (
    <header>
      <div className="header-left">
        <Link to="/" style={{ textDecoration: "none" }}>
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
        </Link>

        <nav className="nav-main">
          <ul>
            {/* <Link to="/" style={{ textDecoration: "none" }}>
              <li>All offers</li>
            </Link> */}
            {/* <li>Men</li>
            <li>Kids</li>
            <li>Home</li>
            <li>About</li> */}
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <div className="buttons">
          {userToken ? (
            <div className="connectionButtons">
              <Link to="/">
                <button className="link" onClick={() => setUser(null)}>
                  Sign Out
                </button>
              </Link>
              <div className="vert-separator"></div>
              <button className="button-primary">Sell now</button>
            </div>
          ) : (
            <div className="connectionButtons">
              <button
                className="link"
                onClick={() => {
                  if (displayModalSignUp === false) {
                    setDisplayModalSignUp(true);
                    setDisplayModalSignIn(false);
                  } else {
                    setDisplayModalSignUp(false);
                  }
                }}
              >
                Sign Up
              </button>
              <div className="vert-separator"></div>
              <button
                className="link"
                onClick={() => {
                  console.log("Sign in " + displayModalSignIn);
                  if (displayModalSignIn === false) {
                    setDisplayModalSignIn(true);
                    setDisplayModalSignUp(false);
                  } else {
                    setDisplayModalSignIn(false);
                  }
                }}
              >
                Sign In
              </button>
              <button className="button-primary">Sell now</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
