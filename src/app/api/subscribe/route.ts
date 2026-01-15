
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const API_KEY = process.env.BREVO_API_KEY;

    if (!API_KEY) {
      console.error("Missing BREVO_API_KEY environment variable");
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({ email, updateEnabled: false, listIds: [4] }),
    });

    if (res.ok || res.status === 201 || res.status === 204) {
      return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
    } else {
      const data = await res.json();
      return NextResponse.json({ message: data.message || 'Subscription failed' }, { status: res.status });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
