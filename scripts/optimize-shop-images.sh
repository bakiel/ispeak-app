#!/bin/bash

# Create directory for optimized images
mkdir -p public/images/products/optimized

echo "Optimizing product images from fal.ai..."
echo "========================================"

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "ImageMagick not found. Installing with Homebrew..."
    brew install imagemagick
fi

# Define products and their URLs
products=(
    "ispeak-kids-tshirt|https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png"
    "ispeak-logo-tshirt-set|https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png"
    "ispeak-navy-hoodie|https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png"
    "paji-mascot-backpack|https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png"
    "ispeak-learning-notebook-set|https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png"
    "paji-water-bottle|https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png"
    "paji-sticker-sheet|https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png"
    "ispeak-canvas-tote-bag|https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png"
    "african-languages-educational-poster|https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png"
)

# Process each image
for item in "${products[@]}"; do
    IFS='|' read -r slug url <<< "$item"
    output_file="public/images/products/optimized/${slug}.jpg"
    
    echo "Processing $slug..."
    
    # Download the PNG file
    temp_png="/tmp/${slug}.png"
    curl -s -o "$temp_png" "$url"
    
    # Get original file size
    original_size=$(ls -lh "$temp_png" | awk '{print $5}')
    
    # Use magick command (ImageMagick v7) or convert (v6)
    if command -v magick &> /dev/null; then
        # ImageMagick v7
        magick "$temp_png" \
            -resize "1200x>" \
            -quality 85 \
            -strip \
            -interlace Plane \
            -colorspace sRGB \
            "$output_file"
    else
        # Try sips (built-in macOS tool)
        # First resize
        sips -Z 1200 "$temp_png" --out "/tmp/${slug}_resized.png" >/dev/null 2>&1
        # Then convert to JPEG
        sips -s format jpeg -s formatOptions 85 "/tmp/${slug}_resized.png" --out "$output_file" >/dev/null 2>&1
        rm -f "/tmp/${slug}_resized.png"
    fi
    
    # Get new file size
    if [ -f "$output_file" ]; then
        new_size=$(ls -lh "$output_file" | awk '{print $5}')
        echo "  Original: $original_size (PNG)"
        echo "  Optimized: $new_size (JPEG)"
        echo "  Saved to: $output_file"
    else
        echo "  Error: Failed to convert image"
    fi
    echo ""
    
    # Clean up temp file
    rm -f "$temp_png"
done

echo "========================================"
echo "Image optimization complete!"
echo ""
echo "Next steps:"
echo "1. Upload optimized images to Supabase storage"
echo "2. Update product records with new image URLs"