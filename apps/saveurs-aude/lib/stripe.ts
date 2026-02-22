import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.SECRET_STRIPE_API_KEY ?? "");
  }
  return _stripe;
}
