import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ModalPayment = ({
  userToken,
  setDisplayModalPayment,
  displayModalPayment,
}) => {
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
              >
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
