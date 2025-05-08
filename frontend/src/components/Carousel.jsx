import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Carousel() {
  const slides = [
    {
      id: "slide1",
      // Using the product IDs we used in the combined code as an example
      productId: "prod1",
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offerText: "Limited Time Offer 30% Off",
      imageSrc: "/images/header_headphone_image.webp",
      altText: "Headphones"
    },
    {
      id: "slide2",
      productId: "prod4",
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offerText: "Flash Sale – Only Today!",
      imageSrc: "/images/dd3l13vfoartrgbvkkh5.webp",
      altText: "PlayStation 5"
    },
    {
      id: "slide3",
      productId: "prod4",
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offerText: "Exclusive Deal – 20% Off",
      imageSrc: "/images/header_macbook_image.webp",
      altText: "MacBook Pro"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll effect (remains the same)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [slides.length]);

  // Navigation functions (remain the same)
  const goToNext = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex justify-center">
      {/* Main carousel container - should have a specific height and relative positioning */}
      <div className="carousel w-5/6 rounded-lg overflow-hidden relative min-h-[400px] md:min-h-[350px] bg-gray-200"> {/* Added min-height and background color to the container */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            // --- CSS classes for smooth transition ---
            className={`
              carousel-item absolute inset-0 w-full                     /* Positioning to stack slides on top of each other */
              min-h-[300px] py-8 flex justify-center items-center      /* Basic slide styles */
              transition-opacity duration-700 ease-in-out              /* Enable transition and define duration/type for opacity */
              ${
                index === currentSlide
                  ? "opacity-100 z-10" // Active slide: visible and on top of other slides
                  : "opacity-0 z-0 pointer-events-none" // Inactive slides: transparent and non-interactive
              }
            `}
       
          >
            {/* --- Slide Content (remains the same) --- */}
            <div className="flex flex-col md:flex-row items-center w-full px-4 md:px-20 gap-2">
              {/* Text */}
              <div className="text-center md:text-left flex-1 mb-3 md:mb-0">
                <p className="text-orange-500 text-sm mb-2">
                  {slide.offerText}
                </p>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black leading-snug mb-4">
                  {slide.title}
                </h2>
                <div className="flex justify-center md:justify-start gap-3 flex-wrap">
                  <Link
                    // Use specific product ID
                    to={`/product/${slide.productId}`}
                    className="btn border-none bg-orange-500 hover:bg-orange-600 text-black"
                  >
                    Buy now
                  </Link>
                  <Link
                    to="/shop"
                    className="btn bg-transparent border-black text-black dark:border-black dark:text-black hover:bg-transparent"
                  >
                    Find more
                  </Link>
                </div>
              </div>
              {/* Image */}
              <div className="flex justify-center flex-shrink-0">
                <img
                  src={slide.imageSrc}
                  alt={slide.altText}
                  className="w-full max-w-[180px] md:max-w-[250px] lg:max-w-[300px] object-contain"
                />
              </div>
            </div>
             {/* --- End Slide Content --- */}
          </div>
        ))}

        {/* Navigation buttons (remain the same but adjust z-index) */}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20"> {/* Ensure buttons are above slides */}
          <button onClick={goToPrev} className="btn btn-circle opacity-50 hover:opacity-100"> {/* Adjust opacity */}
            ❮
          </button>
          <button onClick={goToNext} className="btn btn-circle opacity-50 hover:opacity-100"> {/* Adjust opacity */}
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}