import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";

const ModalPublish = ({
  userToken,
  displayModalSignIn,
  displayModalPublish,
  setUser,
  setDisplayModalSignIn,
  setDisplayModalSignUp,
  setDisplayModalPublish,
  setUsername,
}) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState();
  const [city, setCity] = useState();
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [picture, setPicture] = useState();
  // const [inputError, setInputError] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("no file");

  const history = useHistory();

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleConditionChange = (event) => {
    const value = event.target.value;
    setCondition(value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  // const handlePictureChange = (event) => {
  //   const value = event.target.files[0];
  //   setPicture(value);
  // };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      //Creation du FormData et push des données
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("picture", picture);

      //Envoi de la requete vers le serveur
      const response = await axios.post(
        "https://quentin-vinted-backend.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      console.log(response.data);
      setDisplayModalPublish(false);
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (displayModalPublish === true) {
    return (
      <div className="modalWrapper">
        <div className="modalPublish">
          <div
            className="closeModal"
            onClick={() => {
              setDisplayModalPublish(false);
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
              <h4>Publish an offer</h4>
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
                <div className="form-sign-up">
                  <label className="form-label">Titre *</label>
                  <input
                    type="text"
                    name="title"
                    className="title"
                    required
                    onChange={handleTitleChange}
                  />
                </div>

                <div className="form-sign-up">
                  <label className="form-label">Description *</label>
                  <input
                    type="text"
                    name="description"
                    className="description"
                    required
                    onChange={handleDescriptionChange}
                  />
                </div>

                <div className="form-sign-up">
                  <label className="form-label">Price *</label>
                  <input
                    type="text"
                    name="price"
                    className="price"
                    required
                    onChange={handlePriceChange}
                  />
                </div>

                <div className="form-sign-up">
                  <label className="form-label">Condition</label>
                  <input
                    type="text"
                    name="condition"
                    className="condition"
                    onChange={handleConditionChange}
                  />
                </div>

                <div className="form-sign-up">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="city"
                    onChange={handleCityChange}
                  />
                </div>

                <div className="form-sign-up">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    className="brand"
                    onChange={handleBrandChange}
                  />
                </div>

                <div className="form-sign-up">
                  <label className="form-label">Color</label>
                  <input
                    type="text"
                    name="color"
                    className="color"
                    onChange={handleColorChange}
                  />
                </div>
                <label className="form-label">Add a picture</label>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    setPicture(acceptedFiles[0]);
                    console.log(acceptedFiles);
                    setPreview(URL.createObjectURL(acceptedFiles[0]));
                    setFileName(acceptedFiles[0].name);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzoneContainer">
                        <input {...getInputProps()} />

                        <p>
                          Drag 'n' drop some files here, or click to select a
                          files. 1 file maximum.
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <p className="form-label">File preview({fileName})</p>
                <img className="preview" alt={fileName} src={preview} />

                <button
                  className="button-primary"
                  type="submit"
                  value="Publish"
                >
                  Publish
                </button>
                {/* {inputError === true && (
                  <div className="inputError">
                    Informations are missing please fill the required fields.
                  </div>
                )} */}
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

export default ModalPublish;
