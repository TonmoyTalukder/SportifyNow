import FeaturedSportsFacility from "../../components/ui/FeaturedSportsFacility";
import HomeSlide from "../../components/ui/HomeSlide/HomeSlide";
import HowItWorks from "../../components/ui/HowItWorks/HowitWorks";
import LoyaltyPledge from "../../components/ui/LoyaltyPledge/LoyaltyPledge";

const Home = () => {

  return (
    <div style={{ backgroundColor: 'transparent', color: "white", height: 'auto' }}>
      <div>
        <HomeSlide />
        <FeaturedSportsFacility/>
        <HowItWorks/>
        <LoyaltyPledge/>
      </div>
    </div>
  );
};

export default Home;
