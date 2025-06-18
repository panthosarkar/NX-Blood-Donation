import React from "react";
import HomePageServices from "./HomePageServices";
import HomePageHeroSection from "./HomePageHeroSection";
import HomeFindBloodSection from "./HomeFindBloodSection";
import HomeBloodRequestSection from "./HomeBloodRequestSection";
import HomeNetworkSection from "./HomeNetworkSection";

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
      <section>
        <HomeNetworkSection />
      </section>
    </div>
  );
};

export default HomePage;
