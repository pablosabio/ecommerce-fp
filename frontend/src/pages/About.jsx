import React from 'react';
import { Link } from 'react-router-dom';

const BRAND_COLOR = 'text-orange-500';

export default function About() {
  return (
    <div className="pt-18 min-h-screen">
      <section className="bg-base-200 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About Quick<span className={`${BRAND_COLOR} font-black`}>Cart</span>
              </h1>
              <p className="text-lg text-base-content/70">
                Your trusted destination for premium tech products delivered with exceptional
                service and expertise.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://res.cloudinary.com/dnhduqv8j/image/upload/v1747680798/sean-pollock-PhYq704ffdA-unsplash_rrpfjl.jpg"
                alt="Team of professionals"
                className="rounded-lg shadow-xl w-full h-auto max-h-[700px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src="https://res.cloudinary.com/dnhduqv8j/image/upload/v1747681366/sable-flow-T74mVg__F_k-unsplash_o2tpwg.jpg"
                alt="Our story illustration"
                className="rounded-lg w-full max-w-sm h-auto shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="mb-3">
                Founded in 2019, QuickCart began with a simple mission: to make quality technology
                accessible to everyone. We noticed that the traditional retail experience was often
                confusing, overwhelming, and filled with technical jargon that left customers
                feeling lost.
              </p>
              <p className="mb-3">
                Our founders, tech enthusiasts themselves, set out to create a shopping experience
                that prioritizes clarity, quality, and customer satisfaction. Starting with just a
                small selection of carefully curated products, we've grown to offer a comprehensive
                range of tech solutions for every need.
              </p>
              <p>
                Today, QuickCart serves thousands of customers across Europe, maintaining our
                commitment to personalized service and expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-100 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              These principles guide everything we do at QuickCart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center">Customer First</h3>
                <p className="text-center">
                  We prioritize your needs and experience above all else, ensuring every interaction
                  leaves you satisfied.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center">Quality Assurance</h3>
                <p className="text-center">
                  We carefully select products from trusted brands and thoroughly test them to
                  ensure reliability.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center">Transparency</h3>
                <p className="text-center">
                  We believe in clear pricing, honest product information, and straightforward
                  policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              The dedicated team behind QuickCart's success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <figure className="px-4 pt-4">
                <img
                  src="https://res.cloudinary.com/dnhduqv8j/image/upload/v1747681861/daria-pimkina-tYaccl19A3Q-unsplash_vvpln3.jpg"
                  alt="Sarah Johnson"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl">Sarah Johnson</h3>
                <p className="text-orange-500 font-medium">CEO & Co-Founder</p>
                <p className="text-sm mt-2">
                  With over 15 years in tech retail, Sarah leads our vision and strategic direction.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <figure className="px-4 pt-4">
                <img
                  src="https://res.cloudinary.com/dnhduqv8j/image/upload/v1747681945/zahir-namane-hwc7eIQiTCE-unsplash_d73zyd.jpg"
                  alt="Michael Chen"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl">Michael Chen</h3>
                <p className="text-orange-500 font-medium">CTO & Co-Founder</p>
                <p className="text-sm mt-2">
                  Michael ensures our technical operations run smoothly and leads product testing.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <figure className="px-4 pt-4">
                <img
                  src="https://res.cloudinary.com/dnhduqv8j/image/upload/v1747682031/lidka-ratajczak-09yDagyxMUk-unsplash_osa1e3.jpg"
                  alt="Elena Rodriguez"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title text-xl">Elena Rodriguez</h3>
                <p className="text-orange-500 font-medium">Customer Experience Director</p>
                <p className="text-sm mt-2">
                  Elena oversees our customer service team and ensures your satisfaction with every
                  purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-base-200 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-orange-500">5+</h3>
                <p className="text-lg">Years in Business</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-orange-500">20K+</h3>
                <p className="text-lg">Happy Customers</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-orange-500">500+</h3>
                <p className="text-lg">Products</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-orange-500">15+</h3>
                <p className="text-lg">Expert Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="card bg-orange-500 text-white shadow-xl">
            <div className="card-body text-center py-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience QuickCart?
              </h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Explore our curated collection of premium tech products and discover why thousands
                of customers trust us.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  to="/shop"
                  className="btn bg-white text-orange-500 hover:bg-gray-100 border-none"
                >
                  Shop Now
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline text-white hover:bg-white hover:text-orange-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
