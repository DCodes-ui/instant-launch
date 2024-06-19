import Head from 'next/head';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SuccessPage() {
  const [landingPageCode, setLandingPageCode] = useState('');
  const [stripeIntegrationCode, setStripeIntegrationCode] = useState('');
  const [checkoutButtonCode, setCheckoutButtonCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [stripeCopied, setStripeCopied] = useState(false);
  const [buttonCopied, setButtonCopied] = useState(false);

  const downloadProject = () => {
    const blob = new Blob([landingPageCode, stripeIntegrationCode, checkoutButtonCode], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'project-code.js');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <Head>
        <title>Success - Get Your SaaS Landing Page</title>
        <meta name="description" content="Your payment was successful. Download your landing page code or the complete project." />
      </Head>
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-6 pt-24">
        <section className="text-center py-12">
          <h1 className="text-6xl text-emerald-500 font-passion">Payment Successful!</h1>
          <p className="text-3xl text-gray-100 mt-4 font-passion"><span className="bg-yellow-400 px-3 text-gray-900">Thank you</span> for your purchase.</p>
          <p className="text-3xl text-gray-100 mt-4 font-passion">You can now download the complete project file.</p>
          <div className="mt-8">
            <a href="/basic-project.zip" download className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded hover:bg-green-700 transition duration-300">
              Download Project File
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}