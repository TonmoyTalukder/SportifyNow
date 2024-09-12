import HomeSlide from "../../components/ui/HomeSlide/HomeSlide";
import HowItWorks from "../../components/ui/HowItWorks/HowitWorks";

const Home = () => {

  return (
    <div style={{ backgroundColor: 'transparent', color: "white", height: 'auto' }}>
      <div>
        <HomeSlide />
        <HowItWorks/>
      </div>
    </div>
  );
};

export default Home;
