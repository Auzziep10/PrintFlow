import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { priceId, planName } = body;

        const stripeKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeKey || stripeKey === 'sk_test_placeholder') {
            return NextResponse.json({ demo: true, message: `Running in demo mode. A Stripe Billing Checkout Session for the ${planName} plan would launch here. Paste real keys in .env.local to activate!` });
        }

        const stripe = new Stripe(stripeKey, {
            apiVersion: '2026-02-25.clover',
        });

        // Create a checkout session for a recurring Stripe subscription
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${req.headers.get('origin')}/settings?subscription_success=true`,
            cancel_url: `${req.headers.get('origin')}/settings?subscription_canceled=true`,
            // Normally attach the shop's customer ID here if they already exist in Stripe:
            // customer: 'cus_xxxx',
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('Error in Stripe Subscribe Route:', error);
        return NextResponse.json({ error: error.message || 'Failed to initialize Stripe Subscription' }, { status: 500 });
    }
}
