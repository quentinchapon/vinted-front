import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import HeroBanner from "./HeroBanner";
import defaultProfil from "../img/default_profil.png";
import Heart from "../img/ic_heart.svg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("price-asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://quentin-vinted-backend.herokuapp.com/offers?description=${search}&sort=${sortPrice}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, sortPrice]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="wrapper">
      <HeroBanner
        setSearch={setSearch}
        setSortPrice={setSortPrice}
      ></HeroBanner>
      <div className="offers-list">
        {data.offers.map((offer, index) => {
          return (
            <Link
              to={`/offer/${offer._id}`}
              style={{ textDecoration: "none" }}
              key={offer._id}
            >
              <div className="offer-card-main">
                <div className="offer-card-image">
                  <img src={offer.product_image.url} alt=""></img>
                </div>

                <div className="offer-card-content">
                  <div className="card-info">
                    <div className="offer-card-price">
                      <p>{offer.product_price} €</p>
                    </div>
                    <div className="offer-card-fav">
                      <img src={Heart} alt=""></img>
                    </div>
                  </div>
                  <div className="offer-card-description">
                    {offer.product_description}
                  </div>
                  <div className="offer-card-brand">
                    <p>{offer.product_details[0].MARQUE}</p>
                  </div>

                  <div className="offer-card-size">
                    <p>{offer.product_details[1].TAILLE}</p>
                  </div>

                  <div className="hor-separator"></div>
                  <div className="offer-card-user">
                    <img src={defaultProfil} alt=""></img>
                    <p>{offer.owner.account.username}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
