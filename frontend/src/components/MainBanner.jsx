import React from "react";
import "../styles/MainBanner.css";

const MainBanner = () => {
  return (
    <section className="main-banner">
      <div className="row align-items-center">
        <div className="col-12 px-5 py-5 ">
          <h1 className="fw-bold">A book for Coffee Recipes</h1>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            vitae enim pharetra, venenatis nunc eget, finibus est.
          </p>
          <p className="text-muted"></p>
        </div>
        <div className="col-md-6 px-5 py-5"></div>
      </div>
    </section>
  );
};

export default MainBanner;
