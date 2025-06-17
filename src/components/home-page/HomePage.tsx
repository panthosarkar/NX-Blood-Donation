import React from "react";
import HomePageServices from "./HomePageServices";
import HomePageHeroSection from "./HomePageHeroSection";
import HomeFindBloodSection from "./HomeFindBloodSection";
import HomeBloodRequestSection from "./HomeBloodRequestSection";

const HomePage = () => {
  return (
    <div className="space-y-[100px]">
      <section>
        <HomePageHeroSection />
      </section>
      <section>
        <HomePageServices />
      </section>
      <section>
        <HomeFindBloodSection />
      </section>
      <section>
        <HomeBloodRequestSection />
      </section>
    </div>
  );
};

export default HomePage;
