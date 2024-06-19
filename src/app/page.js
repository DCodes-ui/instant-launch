"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../supabase-client';
import CheckoutButton from '../components/CheckoutButton';

export default function LandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session ? session.user : null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session ? session.user : null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Head>
        <title>Get Your SaaS Landing Page</title>
        <meta name="description" content="Get a fully SEO optimized landing page with AI integration and payment processing in minutes." />
        <meta name="keywords" content="SaaS, landing page, SEO, payment integration, AI wrapper, database integration" />
        <meta name="author" content="Your Company Name" />
        <meta property="og:title" content="Get Your SaaS Landing Page" />
        <meta property="og:description" content="Get a fully SEO optimized landing page with AI integration and payment processing in minutes." />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Your SaaS Landing Page" />
        <meta name="twitter:description" content="Get a fully SEO optimized landing page with AI integration and payment processing in minutes." />
        <meta name="twitter:image" content="/path/to/image.jpg" />
      </Head>
      <header className="w-full bg-gray-800 py-6 fixed top-0 z-10">
        <div className="container mx-auto flex items-center px-6 justify-between">
          <div className="flex items-center">
          <Image src="/" alt="Logo" width={80} height={80} className="mr-20" />
            <nav className="flex space-x-10">
              <a href="#pricing" className="text-2xl text-yellow-400 hover:text-yellow-600 font-passion">Pricing</a>
              <a href="#demo" className="text-2xl text-yellow-400 hover:text-yellow-600 font-passion">Demo</a>
            </nav>
          </div>
          <div>
            {user ? (
              <>
                <span className="text-xl text-yellow-400 mr-4">Welcome! {user.email}</span>
                <button onClick={handleSignOut} className="text-2xl text-yellow-400 hover:text-yellow-600 font-passion">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/signin" legacyBehavior>
                  <a className="text-2xl text-yellow-400 hover:text-yellow-600 mr-4 font-passion">Sign In</a>
                </Link>
                <Link href="/signup" legacyBehavior>
                  <a className="text-2xl text-yellow-400 hover:text-yellow-600 font-passion">Sign Up</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-6 pt-24">
        <section className="text-center py-12">
          <h1 className="text-7xl font-bold text-white mt-12 font-passion">Put your Headline <span className="bg-yellow-400 px-3 text-gray-900">here</span></h1>
          <p className="text-4xl text-gray-200 font-passion"><span className="line-through opacity-50">Days</span> of work done in <span className="text-yellow-400">Hours</span></p>
          <div className="flex-grow container mx-auto flex flex-col items-center justify-center my-12">
          <h1 className="text-6xl font-bold text-gray-400 mt-12 font-passion">Put here a picture or a interactive produkt demo</h1>
        </div>
          <div className="mt-12">
              <a href="#pricing" className="px-8 py-4 bg-yellow-500 text-black text-lg font-semibold rounded hover:bg-yellow-600 transition duration-300 font-passion">
                Start Now
              </a>
          </div>
        </section>

        <section id="demo" className="w-full bg-gray-900 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-xl font-bold text-yellow-400 mb-6 font-passion">Demo</h2>
            <div className="ml-60 mr-64">
          <p className="text-4xl text-white mt-8 font-passion mt-20">Describe your Produkt</p>
          <p className="text-xl text-gray-400 mt-8">-</p>
          <p className="text-xl text-gray-400 mt-8">-</p>
          <p className="text-xl text-gray-400 mt-8">-</p>
          <p className="text-xl text-gray-400 mt-8">-</p>
          <p className="text-xl text-gray-400 mt-8">-</p>
          </div>
            <div className="flex justify-center space-x-6 mt-20">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">Watch Our Demo Video</h3>
                <p className="text-gray-400 mt-4">See how our tool works in action and learn how to get the most out of it.</p>
                <div className="mt-6">
                  <iframe className="w-full h-64 rounded-lg" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo Video" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full bg-gray-900 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-xl font-bold text-yellow-400 mb-6 font-passion">Pricing</h2>
            <h3 className="text-5xl font-bold text-white font-passion">Get your Landing Page,</h3>
            <h3 className="text-5xl font-bold text-white mb-20 font-passion">launch, get profitable!</h3>
            <div className="flex justify-center space-x-6">
              <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-white">Basic</h3>
                <p className="text-4xl text-yellow-400 mt-2"><span className="line-through">$29</span> $19</p>
                <ul className="text-lg text-gray-400 mt-4 space-y-2">
                  <li>✓ SEO optimized Landing Page</li>
                  <li>✓ Stripe-Payment Integration</li>
                  <li className="line-through opacity-50">✗ OpenAI API Integration</li>
                  <li className="line-through opacity-50">✗ User Account Integration</li>
                  <li className="line-through opacity-50">✗ Database Integration</li>
                  <li className="line-through opacity-50">✗ Mailgun Integration</li>
                </ul>
                <CheckoutButton plan="basic" />
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white">Pro</h3>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">POPULAR</span>
                </div>
                <p className="text-4xl text-yellow-400 mt-2"><span className="line-through">$39</span> $29</p>
                <ul className="text-lg text-gray-400 mt-4 space-y-2">
                  <li>✓ SEO optimized Landing Page</li>
                  <li>✓ Stripe-Payment Integration</li>
                  <li>✓ OpenAI API Integration</li>
                  <li className="line-through opacity-50">✗ User Account Integration</li>
                  <li className="line-through opacity-50">✗ Database Integration</li>
                  <li className="line-through opacity-50">✗ Mailgun Integration</li>
                </ul>
                <CheckoutButton plan="pro" />
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-white">Enterprise</h3>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">BEST VALUE</span>
                </div>
                <p className="text-4xl text-yellow-400 mt-2"><span className="line-through">$99</span> $79</p>
                <ul className="text-lg text-gray-400 mt-4 space-y-2">
                  <li>✓ SEO optimized Landing Page</li>
                  <li>✓ Stripe-Payment Integration</li>
                  <li>✓ OpenAI API Integration</li>
                  <li>✓ User Account Integration</li>
                  <li>✓ Database Integration</li>
                  <li>✓ Mailgun Integration</li>
                </ul>
                <CheckoutButton plan="enterprise" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-800 py-20 mt-40">
        <div className="container mx-auto text-center text-gray-400">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}