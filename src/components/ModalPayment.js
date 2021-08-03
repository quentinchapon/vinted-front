import axios from "axios";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const ModalPayment = ({
  userToken,
  setDisplayModalPayment,
  displayModalPayment,
}) => {
  const stripe = useStripe();
  const elements = useElements();

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
          title: "Mon titre",
          price: amount,
        }
      );
      console.log("La réponse du serveur ====> ", response.data);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  if (displayModalPayment === true) {
    return (
      <div className="modalWrapper">
        <div className="modalPublish">
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
              <h4>Payment</h4>
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
                <CardElement />
                <button
                  className="button-primary"
                  type="submit"
                  value="Publish"
                  value="Confirm and pay"
                >
                  Confirm and pay
                </button>
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
