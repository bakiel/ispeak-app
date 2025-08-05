#!/bin/bash

echo "Testing all product pages..."
echo "=========================="

# Array of all product slugs
slugs=(
  "paji-plushie-soft-mascot"
  "paji-squishy-stress-toy"
  "ispeak-teacher-coffee-mug"
  "african-languages-wall-posters"
  "african-tales-storybook-collection"
  "african-heritage-pattern-notebook"
  "yoruba-language-flashcards"
  "kiswahili-phrases-kids-book"
  "african-languages-educational-poster"
  "ispeak-logo-tshirt-set"
  "ispeak-navy-hoodie"
  "paji-mascot-backpack"
  "ispeak-learning-notebook-set"
  "paji-water-bottle"
  "paji-sticker-sheet"
  "ispeak-canvas-tote-bag"
  "ispeak-kids-tshirt"
)

success_count=0
fail_count=0

for slug in "${slugs[@]}"
do
  url="http://localhost:3000/shop/products/$slug"
  
  # Test if page loads (check for product name in response)
  response=$(curl -s "$url" | grep -c "Add to Cart")
  
  if [ $response -gt 0 ]; then
    echo "✓ $slug - Page loads successfully"
    ((success_count++))
  else
    echo "✗ $slug - Page failed to load properly"
    ((fail_count++))
  fi
done

echo ""
echo "=========================="
echo "Results: $success_count successful, $fail_count failed"
echo "=========================="