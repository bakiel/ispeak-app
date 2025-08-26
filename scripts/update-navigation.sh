#!/bin/bash

# List of all files that need to be updated
files=(
  "app/donate/page.js"
  "app/donate/thank-you/page.js"
  "app/donate/confirm/page.js"
  "app/donate/progress/page.js"
  "app/checkout/page.js"
  "app/admin/dashboard/page.js"
  "app/admin/blog/new/page.js"
  "app/admin/blog/page.js"
  "app/admin/products/page.js"
  "app/admin/products/[id]/edit/page.js"
  "app/admin/products/new/page.js"
  "app/shop/page.js"
  "app/shop/products/[slug]/page.js"
  "app/page.js"
  "app/games/page.js"
  "app/mission/page.js"
  "app/plans/page.js"
  "app/test-generated-images/page.js"
  "app/about/page.js"
  "app/not-found.js"
  "app/shop/mockups/page.js"
  "app/shop/specifications/page.js"
  "app/shop/products/[slug]/not-found.js"
  "app/cart/page.js"
  "app/checkout/success/page.js"
  "app/blog/[slug]/page.js"
  "app/blog/page.js"
  "app/terms/page.js"
  "app/resources/free/page.js"
  "app/resources/culture/page.js"
  "app/resources/articles/page.js"
  "app/register/page.js"
  "app/privacy/page.js"
  "app/plans/yoruba/page.js"
  "app/plans/twi/page.js"
  "app/plans/kiswahili/page.js"
  "app/philosophy/page.js"
  "app/method/page.js"
  "app/loyalty/page.js"
  "app/login/page.js"
  "app/group-rates/page.js"
  "app/free-trial/page.js"
  "app/faq/page.js"
  "app/educator-login/page.js"
  "app/educator-apply/page.js"
  "app/contact/page.js"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    # Replace the import statement
    sed -i '' "s|import Navigation from '@/components/Navigation'|import ModernNavigation from '@/components/ModernNavigation'|g" "$file"
    # Replace the component usage
    sed -i '' "s|<Navigation />|<ModernNavigation />|g" "$file"
    sed -i '' "s|<Navigation/>|<ModernNavigation />|g" "$file"
  else
    echo "File not found: $file"
  fi
done

echo "All files updated!"