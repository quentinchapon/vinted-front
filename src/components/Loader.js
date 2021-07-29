const Loader = () => {
  return (
    <div className="wrapperLoader">
      <div className="loader">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            class="ring-track"
            fill="transparent"
            stroke-width="6px"
            stroke="#7B69F2"
            cx="50"
            cy="50"
            r="44"
          />
          <circle
            class="loader-ring"
            fill="transparent"
            stroke-width="6px"
            stroke="#FAF45E"
            stroke-dashoffset="276.460"
            stroke-dasharray="276.460 276.460"
            cx="50"
            cy="50"
            r="44"
          />
          <circle
            class="loader-ring-overlay"
            fill="transparent"
            stroke-width="6px"
            stroke="#ec5c0e"
            stroke-dashoffset="276.460"
            stroke-dasharray="276.460 276.460"
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
