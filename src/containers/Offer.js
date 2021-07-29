import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  console.log(data);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="wrapper">
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
                  <li>
                    <span>{key[0]}</span>
                    <span>{detail[key[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
