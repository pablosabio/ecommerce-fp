import React from "react";

// مكون شريحة فردية
const Slide = ({ id, prev, next, title, offerText, imageSrc, altText }) => (
  <div
    id={id}
    className="carousel-item relative w-full bg-[#E6E9F2] min-h-[300px] py-8 flex justify-center items-center"
  >
    <div className="flex flex-col md:flex-row items-center w-full px-40">
      {/* النص */}
      <div className="text-center md:text-left flex-1 mb-6 md:mb-0">
        <p className="text-[#FF9800] text-sm mb-2">{offerText}</p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black leading-snug mb-4">
          {title}
        </h2>
        <div className="flex justify-center md:justify-start gap-4 flex-wrap">
          <button className="bg-[#FF9800] text-white px-5 py-2 rounded-full">Buy now</button>
          <button className="bg-transparent text-black hover:underline">Find more →</button>
        </div>
      </div>

      {/* الصورة */}
      <div className="flex justify-center flex-shrink-0">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full max-w-[220px] max-h-[220px] object-contain"
        />
      </div>
    </div>

    {/* أزرار التنقل */}
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href={`#${prev}`} className="btn btn-circle" aria-label="Previous slide">❮</a>
      <a href={`#${next}`} className="btn btn-circle" aria-label="Next slide">❯</a>
    </div>
  </div>
);

// الكاروسيل الرئيسي
export default function Carousel() {
  const slides = [
    {
      id: "slide1",
      prev: "slide3",
      next: "slide2",
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offerText: "Limited Time Offer 30% Off",
      imageSrc: "/images/header_headphone_image.webp",
      altText: "Headphones",
    },
    {
      id: "slide2",
      prev: "slide1",
      next: "slide3",
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offerText: "Flash Sale – Only Today!",
      imageSrc: "/images/dd3l13vfoartrgbvkkh5.webp",
      altText: "PlayStation 5",
    },
    {
      id: "slide3",
      prev: "slide2",
      next: "slide1",
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offerText: "Exclusive Deal – 20% Off",
      imageSrc: "/images/header_macbook_image.webp",
      altText: "MacBook Pro",
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="carousel w-5/6 rounded-lg overflow-hidden">
        {slides.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </div>
    </div>
  );
}
