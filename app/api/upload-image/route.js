import { NextResponse } from 'next/server';

// This route proxies image uploads to the Hostinger backend API
// The backend handles file storage, compression, and AI analysis

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud';

export async function POST(request) {
  try {
    // Check if API URL is configured
    if (!API_URL) {
      console.error('API URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error - API URL not set' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const path = formData.get('path');
    const folder = formData.get('folder') || 'products';

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    // Create new FormData for backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);
    backendFormData.append('folder', folder);

    // Upload to Hostinger backend media API
    const response = await fetch(`${API_URL}/api/media/upload?key=ispeak-admin-2024`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      console.error('Backend upload error:', errorData);
      return NextResponse.json(
        { error: errorData.error || 'Failed to upload to backend' },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Construct full URL for the uploaded image
    const imageUrl = result.media?.url
      ? `${API_URL}${result.media.url}`
      : null;

    return NextResponse.json({
      url: imageUrl,
      data: result.media,
      compressed: result.compressed,
      originalSize: result.originalSize,
      finalSize: result.finalSize
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
