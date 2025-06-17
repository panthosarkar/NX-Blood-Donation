import React from "react";
import HomePageServices from "./HomePageServices";
import HomePageHeroSection from "./HomePageHeroSection";

const HomePage = () => {
  return (
    <div>
      <section>
        <HomePageHeroSection />
      </section>
      <section>
        <HomePageServices />
      </section>
    </div>
  );
};

export default HomePage;
