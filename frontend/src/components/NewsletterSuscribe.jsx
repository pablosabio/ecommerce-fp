import React, { useState } from 'react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({
        type: 'success',
        message: 'Thanks for subscribing to our newsletter!'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 py-12">
      <div className="flex justify-center">
        <div className="w-5/6 max-w-4xl">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Content */}
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                  <p className="text-base-content/80 mb-6">
                    Join our newsletter for the latest product updates, tech tips, and exclusive offers.
                  </p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Exclusive deals and promotions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>New product announcements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Tech tips and buying guides</span>
                    </li>
                  </ul>
                </div>
                
                {/* Right side - Form */}
                <div className="md:w-1/2 md:border-l md:border-base-300 md:pl-8">
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Email Address</span>
                      </label>
                      <input
                        type="email"
                        placeholder="youremail@example.com"
                        className="input input-bordered w-full focus:input-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    {status.message && (
                      <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'} py-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          {status.type === 'success' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                        </svg>
                        <span>{status.message}</span>
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Subscribing...
                        </>
                      ) : 'Subscribe Now'}
                    </button>
                    
                    <p className="text-xs text-center text-base-content/60">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}