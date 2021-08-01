import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Heart from "../img/ic_heart.svg";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://quentin-vinted-backend.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="wrapper">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="link back-link">&#8592; Back to offers</div>
      </Link>
      <div className="contentOffer">
        <div className="offerImage">
          <img src={data.product_image.url} alt="" />
        </div>
        <div className="offerInformations">
          <div className="offerHeader">
            <div className="offerTitle">
              <h3>{data.product_name}</h3>
            </div>
            <div className="offerFav">
              <img src={Heart} alt="" />
            </div>
          </div>
          <div className="offerPrice">
            <p>{data.product_price} €</p>
          </div>
          <div className="offerDescription">
            <p>{data.product_description}</p>
          </div>
          <div className="offerInfos">
            <ul>
              {data.product_details.map((detail, index) => {
                const key = Object.keys(detail);
                return (
                  <li key={index}>
                    <span>{key[0]}:</span>
                    <span> {detail[key[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="btnBuy button-primary">
            <button>Buy product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
