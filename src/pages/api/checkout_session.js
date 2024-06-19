import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { plan } = req.body;

      let priceId;
      switch (plan) {
        case 'basic':
          priceId = process.env.STRIPE_BASIC_PRICE_ID;
          break;
        case 'pro':
          priceId = process.env.STRIPE_PRO_PRICE_ID;
          break;
        case 'enterprise':
          priceId = process.env.STRIPE_ENTERPRISE_PRICE_ID;
          break;
        default:
          throw new Error('Invalid plan');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',  // ensure this is set to 'payment' for one-time payments
        success_url: `${req.headers.origin}/success-${plan}`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}