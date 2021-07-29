const Loader = () => {
  return (
    <div className="wrapperLoader">
      <div className="loader">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            className="ring-track"
            fill="transparent"
            strokeWidth="6px"
            stroke="#7B69F2"
            cx="50"
            cy="50"
            r="44"
          />
          <circle
            className="loader-ring"
            fill="transparent"
            strokeWidth="6px"
            stroke="#FAF45E"
            strokeDashoffset="276.460"
            strokeDasharray="276.460 276.460"
            cx="50"
            cy="50"
            r="44"
          />
          <circle
            className="loader-ring-overlay"
            fill="transparent"
            strokeWidth="6px"
            stroke="#ec5c0e"
            strokeDashoffset="276.460"
            strokeDasharray="276.460 276.460"
            cx="50"
            cy="50"
            r="44"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
