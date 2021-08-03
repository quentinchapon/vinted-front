import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const ModalPayment = ({
  userToken,
  setDisplayModalPayment,
  displayModalPayment,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const userId = "";
  const product_price = "";

  const handleSubmit = async (event) => {
    console.log("Coucou");
    try {
      event.preventDefault();
      // Récupérer les données du formulaire
      const cardElements = elements.getElement(CardElement);
      // Envoyer à l'API Stripe
      const stripeResponse = await stripe.createToken(cardElements, {
        name: "",
      });
      //   console.log(stripeResponse.token.id);
      // Envoyer le stripeToken au serveur
      const response = await axios.post("http://localhost:4000/payment", {
        stripeToken: stripeResponse.token.id,
        price: product_price,
      });
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
              console.log("Click click click");
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
                />
                Confirm and pay
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
