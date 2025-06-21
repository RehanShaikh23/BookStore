import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      emailjs.init('EHogLe3GJZ-0mSNHy');

      await emailjs.send(
        'service_v3cqb5f',
        'template_hamd4th',
        {
          email: email,
          subscriber_email: email,
          message: `New newsletter subscription from: ${email}`,
          subject: 'New BookHaven Newsletter Subscription'
        },
        'EHogLe3GJZ-0mSNHy'
      );

      setStatus('success');
      setMessage("Thank you for subscribing! You'll receive our latest updates soon.");
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Subscription Successful!
          </h3>
          <p className="text-green-700">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center">
      <h3 className="text-lg font-semibold text-coffee-100 mb-4">
        Stay Updated with New Releases
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-coffee-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="w-full pl-10 pr-4 py-3 bg-coffee-700 border border-coffee-600 rounded-lg text-coffee-100 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-coffee-600 hover:bg-coffee-500 disabled:bg-coffee-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {status === 'loading' ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </div>

        {status === 'error' && message && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </form>

      <p className="text-coffee-400 text-xs mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSubscription;