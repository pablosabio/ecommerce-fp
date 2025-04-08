import Carousel from "../components/Carousel";
import Cards from '../components/Cards'

export default function Home() {
  return (
    <div className="pt-24">
      <Carousel />
      <Cards />
      {/* here another componentes of the home page */}
    </div>
  );
}
