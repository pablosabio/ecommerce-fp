import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCards() {
  const features = [
    {
      id: 1,
      title: 'Unparalleled Sound',
      description: 'Experience crystal-clear audio with premium headphones.',
      image:
        'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747321949/girl_with_headphone_image_bbxwx1.png',
      link: '/product/audio-001',
    },
    {
      id: 2,
      title: 'Stay Connected',
      description: 'Compact and stylish earphones for every occasion.',
      image:
        'https://images.pexels.com/photos/8553999/pexels-photo-8553999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/product/audio-003',
    },
    {
      id: 3,
      title: 'Power in Every Pixel',
      description: 'Shop the latest laptops for work, gaming, and more.',
      image:
        'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747688161/surface-Ex0N1altWwc-unsplash_jg1mev.jpg',
      link: '/product/computers-001',
    },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="w-5/6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature) => (
          <Link key={feature.id} to={feature.link} className="block">
            <div className="relative overflow-hidden rounded-lg shadow-lg h-150 group cursor-pointer">
              {/* Background Image with Zoom Effect */}
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-500 group-hover:translate-y-[-5px]">
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="mb-4">{feature.description}</p>

                <div className="inline-flex items-center rounded-md bg-orange-500 border-b-4 border-orange-700 text-white font-bold px-4 py-2 transition-all duration-300 group-hover:bg-orange-600 group-hover:translate-y-[1px] group-hover:border-b-2">
                  Buy now
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
