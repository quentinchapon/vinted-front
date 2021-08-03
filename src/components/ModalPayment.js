import axios from "axios";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const ModalPayment = ({
  userToken,
  setDisplayModalPayment,
  displayModalPayment,
  paymentOfferInfos,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState();
  const userId = "Je suis un user";
  const amount = 666;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Récupérer les données de la CB
      const cardElements = elements.getElement(CardElement);
      // Envoyer à l'API Stripe
      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });
      //   console.log(stripeResponse.token.id);

      // Envoyer le stripeToken au serveur
      const response = await axios.post(
        "https://quentin-vinted-backend.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          title: paymentOfferInfos[1],
          price: paymentOfferInfos[0],
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  if (displayModalPayment === true) {
    return (
      <div className="modalWrapper">
        <div className="modalPayment">
          <div
            className="closeModal"
            onClick={() => {
              setDisplayModalPayment(false);
            }}
          >
            <div className="close-lines">
              <div className="close-line"></div>
              <div className="close-line"></div>
            </div>
          </div>
          <div className="payment">
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
              <h4>Payment</h4>
              <p className="lorem">
                Nam convallis dictum lectus a malesuada. Vestibulum sagittis dui
                eget felis tempor aliquet.
              </p>
              {/* DEBUT CARD */}
              <div className="offer-card-main paymentCard">
                <div className="offer-card-image">
                  <img src={paymentOfferInfos[0]} alt=""></img>
                </div>

                <div className="offer-card-content">
                  <div className="card-info">
                    <div className="offer-card-price">
                      <p>{paymentOfferInfos[1]} €</p>
                    </div>
                  </div>
                  <div className="offer-card-description">
                    {paymentOfferInfos[2]}
                  </div>
                </div>
              </div>

              {/* FIN CARD */}

              <form
                action=""
                method="get"
                className="form-sign text-field-main"
                onSubmit={handleSubmit}
              >
                {message !== "Paiement validé" ? (
                  <>
                    <CardElement />
                    <button
                      className="button-primary button-payment"
                      type="submit"
                      value="Confirm and pay"
                    >
                      Confirm and pay {paymentOfferInfos[1]} euros
                    </button>
                  </>
                ) : (
                  <p className="paymentConfirmation">
                    {" "}
                    Thank you your payment has been confirmed !
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ModalPayment;
