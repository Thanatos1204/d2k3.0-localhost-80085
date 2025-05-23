// src/app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Parse query parameters
  const type = searchParams.get('type') || 'personalized';
  const userId = searchParams.get('user_id') || 'current-user';
  const limit = parseInt(searchParams.get('limit') || '10');
  
  try {
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:5000';
    const apiUrl = `${mlServiceUrl}/api/recommendations/${type}?user_id=${userId}&limit=${limit}`;
    
    console.log(`Fetching recommendations from ML service: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ML service error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Failed to fetch recommendations: ${response.statusText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Recommendation API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations from ML service' },
      { status: 500 }
    );
  }
}