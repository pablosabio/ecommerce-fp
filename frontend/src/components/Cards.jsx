import React from "react";

const ProductCard = ({
  name,
  imageSrc,
  price,
  rating,
  reviewCount,
  buyNowLink,
}) => {
  return (
    <div className="card w-64 bg-base-100 shadow-md">
      <figure>
        <img src={imageSrc} alt={name} className="object-cover h-60 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-sm">${price}</p>
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <input
              key={index}
              type="radio"
              name={`rating-${name.replace(/\s/g, "-")}`}
              className="mask mask-star-2 bg-orange-400"
              disabled
              checked={Math.round(rating) > index}
            />
          ))}
        </div>
        <span className="text-sm">({reviewCount})</span>
        <div className="card-actions justify-end">
          <a
            href={buyNowLink}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy now
          </a>
        </div>
      </div>
    </div>
  );
};

const AllProductsGrid = () => {
  const productsData = [
    {
      name: "Bose QuietComfort 45",
      imageSrc: "./images/m16coelz8ivkk9f0nwrz.webp", // Replace with actual image URL
      price: 329.99,
      rating: 4,
      reviewCount: 125,
      buyNowLink: "#",
    },
    {
      name: "ASUS ROG Zephyrus G16",
      imageSrc: "/images/wig1urqgnkeyp4t2rtso.webp", // Replace with actual image URL
      price: 1999.99,
      rating: 3,
      reviewCount: 88,
      buyNowLink: "#",
    },
    {
      name: "Samsung Galaxy S23",
      imageSrc: "/images/xjd4eprpwqs7odbera1w.webp", // Replace with actual image URL
      price: 799.99,
      rating: 5,
      reviewCount: 150,
      buyNowLink: "#",
    },
    {
      name: "PlayStation 5",
      imageSrc: "/images/dd3l13vfoartrgbvkkh5.webp", // Replace with actual image URL
      price: 499.99,
      rating: 4,
      reviewCount: 210,
      buyNowLink: "#",
    },
    {
      name: "MacBook Pro 16",
      imageSrc: "/images/header_macbook_image.webp", // Replace with actual image URL
      price: 2499.99,
      rating: 4.6,
      reviewCount: 95,
      buyNowLink: "#",
    },
    {
      name: "Garmin Venu 2",
      imageSrc: "/images/hdfi4u3fmprazpnrnaga.webp", // Replace with actual image URL
      price: 349.99,
      rating: 4.4,
      reviewCount: 112,
      buyNowLink: "#",
    },
    {
      name: "Canon EOS R5",
      imageSrc: "/images/r5h370zuujvrw461c6wy.webp", // Replace with actual image URL
      price: 3899.99,
      rating: 4.7,
      reviewCount: 78,
      buyNowLink: "#",
    },
    {
      name: "Apple AirPods Pro 2nd gen",
      imageSrc: "/images/k4dafzhwhgcn5tnoylrw.webp", // Replace with actual image URL
      price: 249.99,
      rating: 4.9,
      reviewCount: 180,
      buyNowLink: "#",
    },
    {
      name: "Sony WF-1000XM5",
      imageSrc: "/images/e3zjaupyumdkladmytke.webp", // Replace with actual image URL
      price: 299.99,
      rating: 4.5,
      reviewCount: 135,
      buyNowLink: "#",
    },
    {
      name: "Samsung Projector 4k",
      imageSrc: "/images/qqdcly8a8vkyciy9g0bw.webp", // Replace with actual image URL
      price: 1499.99,
      rating: 4.3,
      reviewCount: 62,
      buyNowLink: "#",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {productsData.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};


export default function Card() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-medium text-left w-full">All products</h1>
      <AllProductsGrid />
    </div>
  );
}
