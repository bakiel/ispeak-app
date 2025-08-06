import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create Supabase admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request) {
  try {
    // Check if service role key is configured
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY === 'paste-your-service-role-key-here') {
      console.error('Service role key not configured');
      return NextResponse.json(
        { error: 'Server configuration error - service role key not set' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const path = formData.get('path');
    
    if (!file || !path) {
      return NextResponse.json(
        { error: 'File and path are required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log(`Uploading ${path} (${buffer.length} bytes) to ispeak-products bucket`);
    
    const { data, error } = await supabaseAdmin.storage
      .from('ispeak-products')
      .upload(path, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('ispeak-products')
      .getPublicUrl(path);

    return NextResponse.json({ url: publicUrl, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}