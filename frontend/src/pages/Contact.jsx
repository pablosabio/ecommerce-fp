import React, { useState } from 'react';

const API_BASE_URL = 'https://quickcart-api.onrender.com/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    // Backend API endpoint URL
    const backendUrl = `${API_BASE_URL}/email/send`;

    // Email details
    const recipientEmail = 'supportquickcard@proton.me';
    const emailSubject = `Contact Form Submission from ${formData.name}`;
    const emailBody = `
      You received a new message from your contact form:
      --------------------------------------------------
      Name: ${formData.name}
      Email: ${formData.email}
      --------------------------------------------------
      Message:
      ${formData.message}
    `;

    try {
      // Send POST request to the backend
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: emailSubject,
          text: emailBody,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Form submission error:', responseData.message || 'Unknown error');
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-18 min-h-screen">
      {/* Hero Section with Map */}
      <section className="bg-base-200 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you.
            </p>
          </div>

          <div className="h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.095939952709!2d13.401212077185398!3d52.51854067198131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851d46ff5da97%3A0xc89b53db3be7fa22!2sAlexanderplatz%2C%20Berlin%2C%20Germany!5e0!3m2!1sen!2sde!4v1719175364174!5m2!1sen!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="QuickCart Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-base-content/70">123 Digital Street, Berlin, Germany</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Number</h3>
                    <p className="text-base-content/70">+49 79 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-base-content/70">supportquickcard@proton.me</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-500/10 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-base-content/70">Monday-Friday: 9am - 6pm CET</p>
                    <p className="text-base-content/70">Saturday: 10am - 4pm CET</p>
                    <p className="text-base-content/70">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm bg-base-200 hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm bg-base-200 hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm bg-base-200 hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm bg-base-200 hover:bg-orange-500 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label" htmlFor="name">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label" htmlFor="email">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label" htmlFor="message">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full"
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  {status === 'success' && (
                    <div className="alert alert-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Message sent successfully! Thank you.</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="alert alert-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Failed to send message. Please try again later.</span>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid gap-4">
            <div tabIndex={0} className="collapse collapse-plus bg-base-100 shadow">
              <div className="collapse-title text-lg font-medium">
                What are your shipping options?
              </div>
              <div className="collapse-content">
                <p>
                  We offer standard shipping (3-5 business days), express shipping (1-2 business
                  days), and same-day delivery for select areas. Shipping costs vary based on
                  location and chosen method. Free shipping is available for orders over €100.
                </p>
              </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus bg-base-100 shadow">
              <div className="collapse-title text-lg font-medium">What is your return policy?</div>
              <div className="collapse-content">
                <p>
                  We accept returns within 30 days of purchase for most items in new, unused
                  condition with original packaging. Please contact our customer service team to
                  initiate a return. Refunds are typically processed within 5-7 business days after
                  we receive the returned item.
                </p>
              </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus bg-base-100 shadow">
              <div className="collapse-title text-lg font-medium">
                Do you offer international shipping?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, we ship to most countries worldwide. International shipping times and costs
                  vary by destination. Please note that customers are responsible for any customs
                  fees or taxes required by their country's regulations.
                </p>
              </div>
            </div>

            <div tabIndex={0} className="collapse collapse-plus bg-base-100 shadow">
              <div className="collapse-title text-lg font-medium">How can I track my order?</div>
              <div className="collapse-content">
                <p>
                  Once your order ships, you'll receive a tracking number via email. You can also
                  view order status and tracking information in your account dashboard. If you have
                  any questions about your shipment, please contact our customer service team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
