import Carousel from '../components/Carousel';
import FeatureCards from '../components/FeaturedCards';
import FeaturedProducts from '../components/FeaturedProducts';
import NewsletterSubscribe from '../components/NewsletterSuscribe';

export default function Home() {
  return (
    <div className="pt-24">
      <Carousel />
      <FeaturedProducts />
      <FeatureCards />
      <NewsletterSubscribe />
    </div>
  );
}
