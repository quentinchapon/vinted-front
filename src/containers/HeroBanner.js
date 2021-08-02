import Search from "../img/ic_search.svg";

const HeroBanner = ({ setSearch, sortPrice, setSortPrice }) => {
  return (
    <div className="hero-banner">
      <h1>
        Ready to get dressed<span> ?</span>
      </h1>
      <div className="section-title">
        <h2>Latest offers</h2>
        <div className="vert-separator"></div>
        <div className="filtersBar text-field-main">
          <form className="searchbar" action="">
            <input
              type="texte"
              placeholder="Search for items"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            {/* <button type="">
              <img src={Search} alt="Search"></img>
            </button> */}
            <div className="custom-select">
              <select
                name="sort"
                id="sort"
                value={sortPrice}
                onChange={(event) => {
                  setSortPrice(event.target.value);
                }}
              >
                <option value="price-asc">Price : Low to high</option>
                <option value="price-desc">Price : High to low</option>
              </select>
              <div className="arrow down"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
