export default function Contact() {
  return (
    <div className="pt-24 text-center ">
    <section className="p-6 md:p-12 bg-base-100 text-base-content pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-500">
            We'd love to hear from you! Whether you have a question, feedback, or need support — our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="">
              <span className="text-2xl"><i className="fa-solid fa-phone text-primary"></i></span>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+49 79 1234 5678</p>
              </div>
            </div>

            <div className="">
              <span className="text-2xl"><i className="fa-solid fa-envelope text-primary"></i></span>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>support@quickcard.com</p>
              </div>
            </div>

            <div className="">
              <span className="text-2xl"><i className="fa-solid fa-location-dot text-primary"></i></span>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p>123 Digital Street, Berlin, Germany</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="card bg-base-200 shadow-xl p-6 space-y-4">
            <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
            <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
            <textarea className="textarea textarea-bordered w-full" placeholder="Your Message" rows="5" required></textarea>
            <button className="btn btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
    </div>
  );
}
