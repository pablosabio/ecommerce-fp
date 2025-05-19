import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Define your carousel items directly - no need to fetch products
  const carouselItems = [
    {
      id: "slide1",
      name: "Intelligent Speaker",
      image: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747315581/audio.2.3-removebg-preview_zpibas.png",
      targetProductId: "audio-002", // The product ID to redirect to
      offerText: "Limited Time Offer 30% Off"
    },
    {
      id: "slide2",
      name: "Ultimate Smartphone",
      image: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747315585/smart2.1-removebg-preview_rk71ul.png",
      targetProductId: "smartphones-002", // The product ID to redirect to
      offerText: "Flash Sale – Only Today!"
    },
    {
      id: "slide3",
      name: "Premium Ultrabook",
      image: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747317422/comp1.1-removebg-preview_mspqt9.png",
      targetProductId: "computers-001", // The product ID to redirect to
      offerText: "Exclusive Deal – 20% Off"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {    
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, );

  // Navigation functions
  const goToNext = () => {
    setCurrentSlide((current) => (current + 1) % carouselItems.length);
  };

  const goToPrev = () => {
    setCurrentSlide((current) => (current - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="flex justify-center">
      {/* Main carousel container */}
      <div className="carousel w-5/6 rounded-lg overflow-hidden relative min-h-[400px] md:min-h-[350px] bg-gray-100">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`
              carousel-item absolute inset-0 w-full                     
              min-h-[300px] py-8 flex justify-center items-center      
              transition-opacity duration-700 ease-in-out              
              ${
                index === currentSlide
                  ? "opacity-100 z-10" // Active slide
                  : "opacity-0 z-0 pointer-events-none" // Inactive slides
              }
            `}
          >
            {/* Slide Content - Adjusted padding and gap */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full px-2 md:px-8 gap-0">
              {/* Text - Added padding to move away from edge */}
              <div className="text-center md:text-left flex-1 mb-3 md:mb-0 md:pl-16 lg:pl-20">
                <p className="text-orange-500 text-sm mb-2">
                  {item.offerText}
                </p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black leading-snug mb-4">
                  {item.name} - Experience Excellence!
                </h2>



<div className="flex justify-center md:justify-start gap-4 flex-wrap">

<Link
  to={`/product/${item.targetProductId}`}
  className="group relative rounded-lg px-8 py-3 bg-orange-500 border-2 border-orange-500 text-white font-medium transition-all duration-300 hover:bg-orange-600 hover:border-orange-600 overflow-hidden"
>
  <span className="transition-transform duration-300 transform group-hover:translate-x-3 inline-block">Buy now</span>
  <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  </div>
</Link>
  
<Link
  to="/shop"
  className="group relative rounded-lg px-8 py-3 bg-transparent border-2 border-black text-black font-medium transition-all duration-300 hover:bg-gray-50 overflow-hidden"
>
  <span className="transition-transform duration-300 transform group-hover:-translate-x-2 inline-block">Find more</span>
  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</Link>

</div>












              </div>

              {/* Image - Added padding to move away from edge */}
              <div className="flex justify-center flex-shrink-0 md:pr-24 lg:pr-28">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full max-w-[180px] md:max-w-[250px] lg:max-w-[300px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20">
          <button onClick={goToPrev} className="btn btn-circle opacity-50 hover:opacity-100">
            ❮
          </button>
          <button onClick={goToNext} className="btn btn-circle opacity-50 hover:opacity-100">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}