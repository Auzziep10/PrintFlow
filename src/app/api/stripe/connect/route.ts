import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;

        // Check if we are in demo mode (missing keys or using the placeholder)
        if (!stripeKey || stripeKey === 'sk_test_placeholder') {
            return NextResponse.json({ demo: true, message: 'Running in demo mode. No real Stripe API key configured.' });
        }

        const stripe = new Stripe(stripeKey, {
            apiVersion: '2026-02-25.clover',
        });

        // Normally, you would fetch your signed-in user's Tenant ID and see if they already have a connected account ID saved in Firestore.
        // For this demo, we'll create a brand new connected Express account every time they click the button just to demonstrate the OAuth redirect.

        const account = await stripe.accounts.create({
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            business_type: 'company',
            business_profile: {
                url: 'https://printflow.io', // Normally the shop's actual url
            }
        });

        // Now we generate a secure onboarding link using that new account ID
        // Note: For localhost, we hardcode the return URLs. In production these should be absolute URLs based on window location.
        // E.g., const origin = req.headers.get('origin');
        const origin = req.headers.get('origin') || 'http://localhost:3000';

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${origin}/settings`,
            return_url: `${origin}/settings?stripe_connect_success=true`,
            type: 'account_onboarding',
        });

        return NextResponse.json({ url: accountLink.url });

    } catch (error: any) {
        console.error('Error in Stripe Connect Route:', error);
        return NextResponse.json({ error: error.message || 'Failed to initialize Stripe Connect' }, { status: 500 });
    }
}
