export default function About() {
  return (
    <div className="pt-24 text-center text-3xl">
      <section class="p-6 md:p-12 bg-base-100 text-base-content">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
            <p class="text-lg text-gray-500 ">
              Technology made simple – your trusted digital companion.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <div className="flex justify-center">
                  <h3 className="card-title text-xl font-semibold">
                    Your Trusted Partner
                  </h3>
                </div>

                <p>
                  We help you navigate the digital world with practical,
                  personalized solutions.
                </p>
              </div>
            </div>

            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <div className="flex justify-center">
                  <h3 className="card-title text-xl font-semibold">
                    Curated Brands
                  </h3>
                </div>
                <p>
                  From international names to in-house innovations, we offer
                  tech for every need and budget.
                </p>
              </div>
            </div>

            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <div className="flex justify-center">
                  <h3 class="card-title text-xl font-semibold">
                    Driven by Purpose
                  </h3>
                </div>

                <p>
                  Our growing team is committed to delivering excellence in
                  every click, order, and interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
