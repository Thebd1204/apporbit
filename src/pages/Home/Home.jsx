import React, { useContext } from "react";
import HomeSlider from "../../Components/HomeSlider";
import FeaturedProducts from "../../Components/FeaturedProducts";
import TrendingProducts from "../../Components/TrendingProducts";
import CouponSlider from "../../Components/CouponSilder";
import CountUpCard from "../../Components/CountUpCard";
import ReviewData from "../../Components/ReviewData";
import SubscribeNewsletter from "../../Components/SubscribeNewsletter";
import JoinCommunity from "../../Components/JoinCommunity";
import FAQSection from "../../Components/FAQSection";
import PartnerShowcase from "../../Components/PartnerShowcase";
import AuthContext from "../../context/AuthContext";

const Home = () => {
  const { loginUser } = useContext(AuthContext);
  return (
    <div data-aos="fade-up" data-aos-duration="3000">
      <HomeSlider />
      <FeaturedProducts />
      <TrendingProducts />
      <CouponSlider />
      <ReviewData />
      {!loginUser && <JoinCommunity />}
      <CountUpCard />
      <PartnerShowcase />
      <FAQSection />
      <SubscribeNewsletter />
    </div>
  );
};

export default Home;