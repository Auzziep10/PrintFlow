import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderId, amount, shopConnectedAccountId } = body;

        const stripeKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeKey || stripeKey === 'sk_test_placeholder') {
            return NextResponse.json({ demo: true, message: 'Running in demo mode. Stripe Checkout would launch here. Paste real keys to activate!' });
        }

        const stripe = new Stripe(stripeKey, {
            apiVersion: '2026-02-25.clover',
        });

        // Normally, shopConnectedAccountId is pulled from the DB record for the Shop that created this invoice
        // For testing, we would use a real connected account ID or omit if paying the platform directly.

        const sessionConfig: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Invoice Payment: ${orderId}`,
                        },
                        unit_amount: Math.round(amount * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/portal?success=true`,
            cancel_url: `${req.headers.get('origin')}/portal?canceled=true`,
        };

        // If you had a real connected account ID, you would set it here to route money:
        // if (shopConnectedAccountId) {
        //     sessionConfig.payment_intent_data = {
        //         application_fee_amount: 100, // E.g., $1.00 platform fee
        //         transfer_data: { destination: shopConnectedAccountId },
        //     };
        // }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('Error in Stripe Checkout Route:', error);
        return NextResponse.json({ error: error.message || 'Failed to initialize Stripe Checkout' }, { status: 500 });
    }
}
