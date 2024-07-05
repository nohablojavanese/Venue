import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await fetch('https://backend-api.com/venues');
  const data = await res.json();

  return NextResponse.json(data);
}

