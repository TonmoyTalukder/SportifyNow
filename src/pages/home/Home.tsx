import FeaturedSportsFacility from "../../components/ui/FeaturedSportsFacility";
import HomeSlide from "../../components/ui/HomeSlide/HomeSlide";
import HowItWorks from "../../components/ui/HowItWorks/HowitWorks";

const Home = () => {

  return (
    <div style={{ backgroundColor: 'transparent', color: "white", height: 'auto' }}>
      <div>
        <HomeSlide />
        <FeaturedSportsFacility/>
        <HowItWorks/>
      </div>
    </div>
  );
};

export default Home;
