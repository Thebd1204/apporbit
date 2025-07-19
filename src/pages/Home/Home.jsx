import React from "react";
import HomeSlider from "../../Components/HomeSlider";
import FeaturedProducts from "../../Components/FeaturedProducts";
import TrendingProducts from "../../Components/TrendingProducts";
import CouponSlider from "../../Components/CouponSilder";
import CountUpCard from "../../Components/CountUpCard";
import ReviewData from "../../Components/ReviewData";
import SubscribeNewsletter from "../../Components/SubscribeNewsletter";

const Home = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="3000">
      <HomeSlider />
      <FeaturedProducts />
      <TrendingProducts />
      <CouponSlider />
      <ReviewData />
      <CountUpCard />
      <SubscribeNewsletter />
    </div>
  );
};

export default Home;
