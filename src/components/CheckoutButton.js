"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ plan }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
      console.error('Error:', response.statusText);
      setLoading(false);
      return;
    }

    const { sessionId } = await response.json();
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <button
      role="link"
      onClick={handleClick}
      disabled={loading}
      className="px-8 py-4 bg-yellow-500 text-black text-lg font-semibold rounded hover:bg-yellow-600 transition duration-300 font-passion"
    >
      {loading ? 'Loading...' : 'Buy'}
    </button>
  );
};

export default CheckoutButton;