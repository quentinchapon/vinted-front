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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="wrapper">
      <HeroBanner></HeroBanner>
      <div className="offers-list">
        {data.offers.map((offer, index) => {
          return (
            <Link to={`/offer/${offer._id}`} style={{ textDecoration: "none" }}>
              <div className="offer-card-main" key={offer._id}>
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
                    <p>{offer.product_details[0].TAILLE}</p>
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
