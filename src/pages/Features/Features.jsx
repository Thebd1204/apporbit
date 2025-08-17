import React from "react";
import FeatureSection from "../../Components/FeatureSection";
import OurServices from "../../Components/OurServices";

const Features = () => {
  return (
    <div className="pt-20">
      <FeatureSection
        title="Seamless App Discovery"
        description="Explore a vast collection of applications with intuitive search and filtering options. Find exactly what you need, when you need it."
        image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        reverse={false}
      />
      <FeatureSection
        title="Engage with a Vibrant Community"
        description="Connect with other app enthusiasts, share your experiences, and get valuable insights from a community that loves apps as much as you do."
        image="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        reverse={true}
      />
      <FeatureSection
        title="Empower Your Development Journey"
        description="For developers, AppOrbit provides a platform to showcase your creations, gather feedback, and reach a wider audience. Grow your app with us."
        image="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        reverse={false}
      />
      <OurServices />
    </div>
  );
};

export default Features;
