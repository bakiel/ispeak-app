#!/bin/bash

# Create output directory
mkdir -p public/images/products

# Process each image - convert to JPEG, resize, and optimize
echo "Processing product images..."

# 1. Paji Plushie
sips -s format jpeg /Users/mac/Downloads/PLtvISujJpnwdrzVEJdTk_34136f2cbc3a46798daa33f332192bb0.png --resampleWidth 800 --out public/images/products/paji-plushie.jpg

# 2. Teacher Coffee Mug
sips -s format jpeg /Users/mac/Downloads/YoYwHD3pa3vJy_3GMEfL3_eb28e257215e48ed98c5fc6289047fad.png --resampleWidth 800 --out public/images/products/teacher-coffee-mug.jpg

# 3. Yoruba Flashcards
sips -s format jpeg /Users/mac/Downloads/nFB0oCjR00CSyyaasckRk_da6d35e9341b49cd9069c29396fc9037.png --resampleWidth 800 --out public/images/products/yoruba-flashcards.jpg

# 4. Kiswahili Phrase Book
sips -s format jpeg /Users/mac/Downloads/tRRkuvc_hE_g6kA3NRn9K_88d51769886349d1997fa4a8e356e7d8.png --resampleWidth 800 --out public/images/products/kiswahili-phrase-book.jpg

# 5. Wall Posters
sips -s format jpeg /Users/mac/Downloads/mWFpTc0XTVdUyYsjpSLba_2e01b34de5234297952614e713c118e1.png --resampleWidth 800 --out public/images/products/wall-posters.jpg

# 6. African Tales Storybook
sips -s format jpeg /Users/mac/Downloads/Ve6Dl6udep_814Jas-L_H_ef2ca1d1967a40b793641b5f50170643.png --resampleWidth 800 --out public/images/products/african-tales-books.jpg

# 7. African Pattern Notebook
sips -s format jpeg /Users/mac/Downloads/IjToSBLC7KQg7oTkVszma_a89d1cd2af7249b083417491652ec646.png --resampleWidth 800 --out public/images/products/african-pattern-notebook.jpg

echo "Image processing complete!"
echo ""
echo "Checking file sizes..."
ls -lh public/images/products/*.jpg