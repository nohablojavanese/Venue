import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const res = await fetch(`https://backend-api.com/venues/${params.id}`);
    const data = await res.json();
  
    return NextResponse.json(data);
  }