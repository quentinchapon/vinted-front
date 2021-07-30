import { Link } from "react-router-dom";
import Search from "../img/ic_search.svg";

const Header = ({ userToken, setUser }) => {
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
        <div className="text-field-main">
          <form className="searchbar" action="">
            <input type="texte" placeholder="Search for items" />
            <button type="submit">
              <img src={Search} alt="Search"></img>
            </button>
          </form>
        </div>
        <nav className="nav-main">
          <ul>
            <li>Women</li>
            <li>Men</li>
            <li>Kids</li>
            <li>Home</li>
            <li>About</li>
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
              <Link to="/SignUp">
                <button className="link">Sign Up</button>
              </Link>
              <div className="vert-separator"></div>
              <Link to="/SignIn">
                <button className="link">Sign In</button>
              </Link>
              <button className="button-primary">Sell now</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
