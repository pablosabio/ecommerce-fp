import React, { useState } from 'react'; // 1. Import useState

export default function Contact() {
  // 2. State for form data and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Sender's email
    message: '',
  });
  const [status, setStatus] = useState(''); // To display success or error messages to the user
  const [loading, setLoading] = useState(false); // To track loading state

  // 3. Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value, // Update the corresponding field by matching name
    }));
  };

  // 4. Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser submission
    setLoading(true);   // Start loading
    setStatus('');      // Clear previous status messages

    // --- Backend API endpoint URL ---
    // Use environment variable or fallback for development
    const backendUrl = 'http://localhost:5000/api/email/send'; 

    // --- Set up email details ---
    const recipientEmail = 'support@quickcard.com'; // The email address that will receive the message (website owner's email)
    const emailSubject = `Contact Form Submission from ${formData.name}`; // Subject including sender's name
    // Format email body to include sender info
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
          'Content-Type': 'application/json', // Set content type as JSON
        },
        // Send form data as JSON in the request body
        body: JSON.stringify({
          to: recipientEmail,    // Recipient email
          subject: emailSubject, // Subject
          text: emailBody,       // Message body (can use html if preferred)
          // Note: You can add a replyTo field on the backend if you want default replies to go to the user's email
          // replyTo: formData.email
        }),
      });

      // Read the response from the server
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        setStatus('Message sent successfully! Thank you.'); // Display success message
        // Clear form fields after successful submission
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Display error message from the server if available
        setStatus(`Error: ${result.message || 'Failed to send message.'}`);
      }
    } catch (error) {
      // Handle network errors or failure to connect to the server
      console.error("Contact form submission error:", error);
      setStatus('Error: Could not connect to the server. Please try again later.');
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  // 5. Render UI (connecting state and handlers)
  return (
    // You might need to adjust top margin to fit your navbar
    <div className="pt-24 text-center">
      <section className="p-6 md:p-12 bg-base-100 text-base-content pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-gray-500">
              We'd love to hear from you! Whether you have a question, feedback, or need support — our team is here to help.
            </p>
          </div>

          {/* Grid layout for info and form */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 md:pt-6 text-left"> {/* Left align and top padding */}
              {/* Use flex to improve icon and text layout */}
              <div className="flex items-start gap-4">
                <span className="text-2xl pt-1 text-primary"><i className="fa-solid fa-phone"></i></span>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-base-content/80">+49 79 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl pt-1 text-primary"><i className="fa-solid fa-envelope"></i></span>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-base-content/80">support@quickcard.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl pt-1 text-primary"><i className="fa-solid fa-location-dot"></i></span>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <p className="text-base-content/80">123 Digital Street, Berlin, Germany</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {/* Add onSubmit handler to the form */}
            <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl p-6 space-y-4">
              {/* Name field */}
              <div className="form-control">
                {/* Add label for accessibility */}
                <label htmlFor="name" className="label pb-1"><span className="label-text">Name</span></label>
                <input
                  id="name"
                  type="text"
                  name="name" // Field name to match state
                  placeholder="Your Full Name"
                  className="input input-bordered w-full"
                  value={formData.name} // Bind value to state
                  onChange={handleChange} // Bind change handler
                  required // Make field required
                />
              </div>

              {/* Email field */}
              <div className="form-control">
                <label htmlFor="email" className="label pb-1"><span className="label-text">Email</span></label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message field */}
              <div className="form-control">
                <label htmlFor="message" className="label pb-1"><span className="label-text">Message</span></label>
                <textarea
                  id="message"
                  name="message"
                  className="textarea textarea-bordered w-full"
                  placeholder="Your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit" // Ensure type is submit
                className="btn btn-primary w-full mt-2" // Add a little top margin
                disabled={loading} // Disable button while loading
              >
                {/* Display variable text or loading indicator */}
                {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Send Message'}
              </button>

              {/* 6. Display status message (Success or Error) */}
              {status && (
                <div className={`mt-4 p-3 rounded text-center text-sm ${status.includes('success') || status.includes('successfully') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}