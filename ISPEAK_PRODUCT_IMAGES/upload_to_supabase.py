#!/usr/bin/env python3
import os
import sys
from supabase import create_client, Client
import json
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://gfbedvoexpulmmfitxje.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMTQxNzgsImV4cCI6MjA0Mzc5MDE3OH0.OEo-6jCLYNeBGazF-XnBa1awMd-bxtQfyEamVtIcQGI"

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Product image mapping from catalog
product_images = {
    'language-learning-poster-set': 'language-posters-REAL.jpg',
    'ispeak-alphabet-flashcards': 'alphabet-flashcards-REAL.jpg',
    'african-tales-paji-storybook': 'african-tales-storybook-REAL.jpg',
    'kiswahili-phrases-kids': 'kiswahili-phrases-book-REAL.jpg',
    'ispeak-tshirt-adult': 'ispeak-tshirt-adult.jpg',
    'paji-tshirt-kids': 'paji-tshirt-kids.jpg',
    'ispeak-kids-tshirt': 'ispeak-kids-tshirt.jpg',
    'ispeak-navy-hoodie': 'ispeak-hoodie.jpg',
    'ispeak-cap': 'ispeak-cap.jpg',
    'teacher-coffee-mug': 'teacher-coffee-mug-REAL.jpg',
    'ispeak-tote-bag': 'ispeak-tote-bag.jpg',
    'paji-mascot-backpack': 'ispeak-backpack.jpg',
    'paji-water-bottle': 'water-bottle.jpg',
    'african-heritage-notebook': 'african-patterns-notebook-REAL.jpg',
    'paji-sticker-sheet': 'paji-sticker-sheet.jpg',
    'paji-plush-toy': 'paji-plush-toy-REAL.jpg',
    'paji-squishy-toy': 'paji-squishy-toy.jpg'
}

def upload_image(file_path, storage_path):
    """Upload an image to Supabase storage"""
    try:
        with open(file_path, 'rb') as f:
            file_data = f.read()
            
        # Upload to storage
        response = supabase.storage.from_('ispeak-products').upload(
            path=storage_path,
            file=file_data,
            file_options={"content-type": "image/jpeg", "upsert": "true"}
        )
        
        # Get public URL
        public_url = supabase.storage.from_('ispeak-products').get_public_url(storage_path)
        
        return public_url
    except Exception as e:
        print(f"Error uploading {storage_path}: {str(e)}")
        return None

def main():
    web_optimized_dir = Path('/Users/mac/Downloads/iSPEAK/ISPEAK_PRODUCT_IMAGES/web-optimized')
    thumbnails_dir = web_optimized_dir / 'thumbnails'
    
    uploaded_images = {}
    
    # Upload main images
    print("Uploading main product images...")
    for slug, filename in product_images.items():
        file_path = web_optimized_dir / filename
        if file_path.exists():
            storage_path = f"main/{filename}"
            url = upload_image(file_path, storage_path)
            if url:
                uploaded_images[slug] = {
                    'main': url,
                    'filename': filename
                }
                print(f"✓ Uploaded {filename} -> {storage_path}")
        else:
            # Try without -REAL suffix
            alt_filename = filename.replace('-REAL', '')
            file_path = web_optimized_dir / alt_filename
            if file_path.exists():
                storage_path = f"main/{alt_filename}"
                url = upload_image(file_path, storage_path)
                if url:
                    uploaded_images[slug] = {
                        'main': url,
                        'filename': alt_filename
                    }
                    print(f"✓ Uploaded {alt_filename} -> {storage_path}")
            else:
                print(f"✗ File not found: {filename}")
    
    # Upload thumbnails
    print("\nUploading thumbnail images...")
    for slug, info in uploaded_images.items():
        # Try to find corresponding thumbnail
        base_name = info['filename'].replace('.jpg', '')
        thumb_filename = f"{base_name}_thumb.jpg"
        thumb_path = thumbnails_dir / thumb_filename
        
        if thumb_path.exists():
            storage_path = f"thumbnails/{thumb_filename}"
            url = upload_image(thumb_path, storage_path)
            if url:
                uploaded_images[slug]['thumbnail'] = url
                print(f"✓ Uploaded thumbnail {thumb_filename}")
        else:
            print(f"✗ Thumbnail not found: {thumb_filename}")
    
    # Save URLs to JSON file
    with open('uploaded_urls.json', 'w') as f:
        json.dump(uploaded_images, f, indent=2)
    
    print(f"\n✅ Upload complete! Uploaded {len(uploaded_images)} products")
    print("URLs saved to uploaded_urls.json")
    
    return uploaded_images

if __name__ == "__main__":
    uploaded = main()