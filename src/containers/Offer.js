import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
import Loader from "../components/Loader";
import Heart from "../img/ic_heart.svg";
import defaultProfil from "../img/default_profil.png";

const Offer = ({
  scrollToTop,
  setDisplayModalPayment,
  setDisplayModalSignIn,
  userToken,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offerData, setOfferData] = useState();
  const [offersData, setOffersData] = useState();
  const { id } = useParams();

  useEffect(() => {
    scrollToTop();
    const fetchData = async () => {
      try {
        await axios
          .all([
            axios.get(
              `https://quentin-vinted-backend.herokuapp.com/offer/${id}`
            ),
            axios.get(`https://quentin-vinted-backend.herokuapp.com/offers`),
          ])
          .then(
            axios.spread((...responses) => {
              const responseOne = responses[0];
              const responseTwo = responses[1];
              setOfferData(responseOne.data);
              setOffersData(responseTwo.data);

              setIsLoading(false);
            })
          );
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, scrollToTop]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="wrapper">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="link back-link">&#8592; Back to offers</div>
      </Link>
      <div className="contentOffer">
        <div className="offerImage">
          <img src={offerData.product_image.secure_url} alt="" />
        </div>
        <div className="offerInformations">
          <div className="offerHeader">
            <div className="offerTitle">
              <h3>{offerData.product_name}</h3>
            </div>
            <div className="offerFav">
              <img src={Heart} alt="" />
            </div>
          </div>
          <div className="offerPrice">
            <p>{offerData.product_price} €</p>
          </div>
          <div className="offerDescription">
            <p>{offerData.product_description}</p>
          </div>
          <div className="offerInfos">
            <ul>
              {offerData.product_details.map((detail, index) => {
                const key = Object.keys(detail);
                return (
                  <li key={index}>
                    <span>{key[0] + " : "} </span>
                    <span> {detail[key[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            className="button-primary"
            onClick={() => {
              if (userToken) {
                setDisplayModalPayment(true);
              } else {
                setDisplayModalSignIn(true);
              }
            }}
          >
            Buy product
          </button>
        </div>
      </div>
      <div className="moreContent">
        <h2>More offers</h2>

        <div className="offers-list">
          {offersData.offers.map((offer, index) => {
            return (
              <Link
                to={`/offer/${offer._id}`}
                style={{ textDecoration: "none" }}
                key={offer._id}
                onClick={scrollToTop}
              >
                <div className="offer-card-main">
                  <div className="offer-card-image">
                    <img src={offer.product_image.secure_url} alt=""></img>
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
    </div>
  );
};

export default Offer;
