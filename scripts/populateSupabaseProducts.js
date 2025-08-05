import { createClient } from '@supabase/supabase-js'
// Import the productImages mapping
const productImages = {
  'ispeak-tote-bag': 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
  'paji-plush-toy': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'language-learning-cards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'ispeak-t-shirt': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'african-patterns-notebook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'african-heritage-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'cultural-storybook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-backpack': 'https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png',
  'language-poster-set': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'ispeak-cap': 'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png',
  'paji-t-shirt-kids': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'ispeak-learning-journal': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'yoruba-alphabet-flashcards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'kiswahili-phrase-book': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'teacher-coffee-mug': 'https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png',
  'ispeak-hoodie': 'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png',
  'twi-counting-poster': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'amharic-writing-workbook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png'
}

// Supabase credentials
const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzE2MzIsImV4cCI6MjA2MzE0NzYzMn0.57_oqgccLMM-1dhymPVPB2XuR7bnqNrIP_9iqusA21k'

const supabase = createClient(supabaseUrl, supabaseKey)

// Product collections
const collections = [
  {
    name: 'Apparel',
    slug: 'apparel',
    description: 'Clothing and wearable items featuring iSPEAK branding',
    is_active: true
  },
  {
    name: 'School Supplies',
    slug: 'school-supplies',
    description: 'Educational materials and stationery for language learning',
    is_active: true
  },
  {
    name: 'Educational',
    slug: 'educational',
    description: 'Learning resources and teaching materials',
    is_active: true
  },
  {
    name: 'Toys',
    slug: 'toys',
    description: 'Educational toys and plush items',
    is_active: true
  },
  {
    name: 'Books',
    slug: 'books',
    description: 'Language learning books and cultural resources',
    is_active: true
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bags, water bottles, and other accessories',
    is_active: true
  }
]

// Complete product catalog with all details
const products = [
  {
    name: "Paji T-Shirt - Kids",
    slug: "paji-t-shirt-kids",
    description: "Comfortable cotton t-shirt featuring our beloved Paji mascot. Perfect for young language learners to show their pride in African heritage while learning.",
    long_description: "This premium cotton t-shirt showcases the vibrant spirit of iSPEAK through our beloved Paji mascot. Designed specifically for children ages 3-14, this comfortable and durable shirt is perfect for everyday wear, language learning sessions, or showing cultural pride. The high-quality print features Paji in traditional African-inspired colors, making it both educational and stylish.",
    price: 24.99,
    sale_price: null,
    images: [productImages['paji-t-shirt-kids']],
    featured: true,
    inventory_quantity: 50,
    collection_slug: 'apparel',
    sku: 'PTS-KIDS-001',
    meta_title: 'Paji T-Shirt for Kids - iSPEAK African Language Learning',
    meta_description: 'Comfortable cotton t-shirt featuring Paji mascot. Perfect for young African language learners ages 3-14.',
    tags: ['kids', 'apparel', 'paji', 't-shirt'],
    sizes: ['3T', '4T', '5T', '6', '7', '8', '10', '12'],
    colors: ['Yellow', 'Blue', 'Green'],
    details: [
      "100% premium cotton material",
      "Machine washable in cold water",
      "Available in sizes 3T-12",
      "Vibrant, fade-resistant print",
      "Ethically manufactured with fair trade practices",
      "Pre-shrunk fabric",
      "Reinforced seams for durability"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Weight": "180 GSM",
      "Fit": "Regular",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Ghana"
    }
  },
  {
    name: "iSPEAK Learning Journal",
    slug: "ispeak-learning-journal",
    description: "Beautiful hardcover journal designed specifically for tracking language learning progress. Includes vocabulary sections, cultural notes, and progress tracking pages.",
    long_description: "This beautifully crafted learning journal is the perfect companion for any young language learner. Featuring 120 pages of high-quality paper with specially designed templates for vocabulary tracking, cultural notes, and progress monitoring. The journal includes sections for all four languages taught at iSPEAK: Yoruba, Kiswahili, Twi, and Amharic.",
    price: 19.99,
    sale_price: 15.99,
    images: [productImages['ispeak-learning-journal']],
    featured: false,
    inventory_quantity: 75,
    collection_slug: 'school-supplies',
    sku: 'ILJ-001',
    meta_title: 'iSPEAK Learning Journal - Track Your African Language Progress',
    meta_description: 'Hardcover journal with 120 pages for vocabulary tracking, cultural notes, and language learning progress.',
    tags: ['journal', 'school-supplies', 'learning', 'notebook'],
    sizes: ['One Size'],
    colors: ['Multi-color'],
    details: [
      "120 pages of high-quality, acid-free paper",
      "Durable hardcover binding with lay-flat design",
      "African-inspired cover artwork",
      "Progress tracking templates for all skill levels",
      "Cultural learning sections with prompts",
      "Vocabulary pages with pronunciation guides",
      "Goal-setting and reflection pages"
    ],
    specifications: {
      "Dimensions": "8.5\" x 11\"",
      "Pages": "120 pages",
      "Paper": "90 GSM acid-free",
      "Binding": "Hardcover with ribbon bookmark",
      "Cover": "Matte finish with spot UV"
    }
  },
  {
    name: "Yoruba Alphabet Flashcards",
    slug: "yoruba-alphabet-flashcards",
    description: "Interactive flashcards for learning Yoruba alphabet with pronunciation guides and cultural context.",
    long_description: "Master the Yoruba alphabet with these beautifully illustrated flashcards. Each card features a letter, pronunciation guide, example word, and cultural illustration to make learning engaging and memorable. Perfect for beginners and young learners exploring the Yoruba language.",
    price: 12.99,
    sale_price: null,
    images: [productImages['yoruba-alphabet-flashcards']],
    featured: true,
    inventory_quantity: 45,
    collection_slug: 'educational',
    sku: 'YAF-001',
    meta_title: 'Yoruba Alphabet Flashcards - Learn African Languages',
    meta_description: 'Educational flashcards with 52 cards featuring Yoruba alphabet, pronunciation guides, and cultural illustrations.',
    tags: ['flashcards', 'yoruba', 'educational', 'alphabet'],
    sizes: ['One Size'],
    colors: ['Multi-color'],
    details: [
      "52 double-sided cards",
      "Pronunciation guides included",
      "Cultural context for each letter",
      "Durable cardstock material",
      "Educational activity suggestions",
      "Rounded corners for child safety",
      "Storage box included"
    ],
    specifications: {
      "Card Count": "52 cards",
      "Dimensions": "3.5\" x 5\"",
      "Material": "350 GSM cardstock",
      "Finish": "Matte with rounded corners",
      "Packaging": "Sturdy storage box"
    }
  },
  {
    name: "Paji Plush Toy",
    slug: "paji-plush-toy",
    description: "Soft and cuddly Paji mascot plush toy, perfect companion for language learning adventures.",
    long_description: "Bring the magic of iSPEAK home with this adorable Paji plush toy. Standing 12 inches tall, this soft and cuddly companion is perfect for children learning African languages. Made with high-quality materials and attention to detail, Paji will become your child's favorite learning buddy.",
    price: 29.99,
    sale_price: null,
    images: [productImages['paji-plush-toy']],
    featured: false,
    inventory_quantity: 30,
    collection_slug: 'toys',
    sku: 'PPT-001',
    meta_title: 'Paji Plush Toy - iSPEAK Mascot Stuffed Animal',
    meta_description: 'Soft and cuddly 12-inch Paji mascot plush toy. Perfect companion for African language learning adventures.',
    tags: ['plush', 'toy', 'paji', 'mascot'],
    sizes: ['12 inches'],
    colors: ['Multi-color'],
    details: [
      "12 inches tall",
      "Super soft polyester filling",
      "Machine washable",
      "Safety tested for ages 3+",
      "Embroidered features",
      "No small parts",
      "Hypoallergenic materials"
    ],
    specifications: {
      "Height": "12 inches",
      "Material": "Polyester plush",
      "Filling": "Hypoallergenic polyester",
      "Safety": "CE certified, ages 3+",
      "Care": "Machine washable on gentle cycle"
    }
  },
  {
    name: "Kiswahili Phrase Book",
    slug: "kiswahili-phrase-book",
    description: "Essential Kiswahili phrases for everyday conversation with pronunciation guides and cultural tips.",
    long_description: "Learn essential Kiswahili phrases with this comprehensive guide designed for beginners and intermediate learners. Features over 500 phrases organized by topic, with clear pronunciation guides and cultural context notes. Perfect for students, travelers, and language enthusiasts.",
    price: 16.99,
    sale_price: null,
    images: [productImages['kiswahili-phrase-book']],
    featured: false,
    inventory_quantity: 60,
    collection_slug: 'books',
    sku: 'KPB-001',
    meta_title: 'Kiswahili Phrase Book - Essential East African Language Guide',
    meta_description: 'Learn over 500 essential Kiswahili phrases with pronunciation guides and cultural tips. Perfect for beginners.',
    tags: ['book', 'kiswahili', 'phrases', 'language-learning'],
    sizes: ['One Size'],
    colors: ['Multi-color'],
    details: [
      "Over 500 essential phrases",
      "Pronunciation guides",
      "Cultural context notes",
      "Topic-based organization",
      "Beginner-friendly layout",
      "Portable size",
      "Durable binding"
    ],
    specifications: {
      "Pages": "96 pages",
      "Dimensions": "5\" x 7\"",
      "Binding": "Perfect bound",
      "Paper": "80 GSM offset",
      "Language": "English-Kiswahili"
    }
  },
  {
    name: "African Heritage Water Bottle",
    slug: "african-heritage-water-bottle",
    description: "Eco-friendly water bottle with African-inspired design, perfect for staying hydrated during language lessons.",
    long_description: "Stay hydrated in style with this beautifully designed water bottle featuring authentic African patterns. Made from sustainable materials and featuring a leak-proof design, this bottle is perfect for school, lessons, or everyday use. The double-wall insulation keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 18.99,
    sale_price: 14.99,
    images: [productImages['african-heritage-water-bottle']],
    featured: false,
    inventory_quantity: 40,
    collection_slug: 'accessories',
    sku: 'AHW-001',
    meta_title: 'African Heritage Water Bottle - Eco-Friendly Insulated Bottle',
    meta_description: 'BPA-free stainless steel water bottle with African-inspired design. Keeps drinks cold for 24 hours.',
    tags: ['water-bottle', 'accessories', 'eco-friendly', 'african-design'],
    sizes: ['20 oz'],
    colors: ['Multi-color'],
    details: [
      "BPA-free stainless steel",
      "Leak-proof design",
      "African-inspired artwork",
      "Keeps drinks cold for 24 hours",
      "Keeps drinks hot for 12 hours",
      "Easy-clean wide mouth",
      "Powder-coated finish"
    ],
    specifications: {
      "Capacity": "20 oz (591 ml)",
      "Material": "18/8 Stainless Steel",
      "Insulation": "Double-wall vacuum",
      "Dimensions": "10.5\" x 2.8\"",
      "Weight": "13 oz"
    }
  },
  {
    name: "iSPEAK Tote Bag",
    slug: "ispeak-tote-bag",
    description: "Durable canvas tote bag with iSPEAK logo, perfect for carrying books and learning materials.",
    long_description: "This sturdy canvas tote bag is perfect for carrying language learning materials, books, or everyday essentials. Features the iSPEAK logo prominently displayed with reinforced handles and a spacious interior. Made from eco-friendly materials to support sustainable practices.",
    price: 14.99,
    sale_price: null,
    images: [productImages['ispeak-tote-bag']],
    featured: false,
    inventory_quantity: 55,
    collection_slug: 'accessories',
    sku: 'ITB-001',
    meta_title: 'iSPEAK Canvas Tote Bag - Eco-Friendly Shopping Bag',
    meta_description: 'Durable canvas tote bag with iSPEAK logo. Perfect for books, learning materials, or everyday use.',
    tags: ['tote-bag', 'accessories', 'canvas', 'eco-friendly'],
    sizes: ['One Size'],
    colors: ['Natural/Yellow'],
    details: [
      "100% cotton canvas",
      "Reinforced handles",
      "Interior pocket",
      "Machine washable",
      "Eco-friendly materials",
      "Spacious interior",
      "Durable construction"
    ],
    specifications: {
      "Dimensions": "15\" x 16\" x 4\"",
      "Material": "12 oz cotton canvas",
      "Handle Drop": "10 inches",
      "Closure": "Open top",
      "Weight Capacity": "30 lbs"
    }
  },
  {
    name: "Language Learning Cards",
    slug: "language-learning-cards",
    description: "Multi-language flashcard set covering basic vocabulary in all four iSPEAK languages.",
    long_description: "Comprehensive flashcard set featuring basic vocabulary in Yoruba, Kiswahili, Twi, and Amharic. Each card includes the word in all four languages with pronunciation guides and colorful illustrations. Perfect for comparative language learning and cultural exploration.",
    price: 22.99,
    sale_price: null,
    images: [productImages['language-learning-cards']],
    featured: true,
    inventory_quantity: 35,
    collection_slug: 'educational',
    sku: 'LLC-001',
    meta_title: 'Multi-Language Learning Cards - African Languages Flashcards',
    meta_description: 'Flashcard set with vocabulary in Yoruba, Kiswahili, Twi, and Amharic. Perfect for comparative language learning.',
    tags: ['flashcards', 'multi-language', 'educational', 'vocabulary'],
    sizes: ['One Size'],
    colors: ['Multi-color'],
    details: [
      "100 vocabulary cards",
      "Four languages per card",
      "Pronunciation guides",
      "Colorful illustrations",
      "Topic-based organization",
      "Durable cardstock",
      "Storage box included"
    ],
    specifications: {
      "Card Count": "100 cards",
      "Languages": "Yoruba, Kiswahili, Twi, Amharic",
      "Dimensions": "4\" x 6\"",
      "Material": "300 GSM cardstock",
      "Topics": "Numbers, Colors, Animals, Family, Food"
    }
  },
  {
    name: "iSPEAK T-Shirt - Adult",
    slug: "ispeak-t-shirt",
    description: "Premium cotton t-shirt with iSPEAK logo for parents and educators supporting language learning.",
    long_description: "Show your support for African language education with this premium cotton t-shirt. Designed for parents, educators, and language enthusiasts, this comfortable shirt features the iSPEAK logo and is perfect for school events, cultural celebrations, or everyday wear.",
    price: 28.99,
    sale_price: null,
    images: [productImages['ispeak-t-shirt']],
    featured: false,
    inventory_quantity: 40,
    collection_slug: 'apparel',
    sku: 'ITS-ADULT-001',
    meta_title: 'iSPEAK T-Shirt for Adults - Support African Language Learning',
    meta_description: 'Premium cotton t-shirt with iSPEAK logo for parents and educators. Show your support for language education.',
    tags: ['t-shirt', 'adult', 'apparel', 'educator'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['Navy', 'White', 'Yellow'],
    details: [
      "100% ring-spun cotton",
      "Pre-shrunk fabric",
      "Side-seamed construction",
      "Shoulder-to-shoulder taping",
      "Double-needle stitching",
      "Tear-away label",
      "Eco-friendly printing"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Weight": "200 GSM",
      "Fit": "Modern unisex",
      "Care": "Machine wash cold",
      "Printing": "Water-based eco-friendly ink"
    }
  },
  {
    name: "African Patterns Notebook",
    slug: "african-patterns-notebook",
    description: "Beautiful notebook featuring traditional African patterns, perfect for note-taking during lessons.",
    long_description: "This stunning notebook features authentic African patterns on the cover, celebrating the rich cultural heritage of the continent. With 80 lined pages of high-quality paper, it's perfect for taking notes during language lessons, journaling, or creative writing.",
    price: 9.99,
    sale_price: null,
    images: [productImages['african-patterns-notebook']],
    featured: false,
    inventory_quantity: 65,
    collection_slug: 'school-supplies',
    sku: 'APN-001',
    meta_title: 'African Patterns Notebook - Cultural Design Journal',
    meta_description: 'Beautiful notebook with traditional African patterns. 80 lined pages perfect for language learning notes.',
    tags: ['notebook', 'african-patterns', 'school-supplies', 'journal'],
    sizes: ['A5'],
    colors: ['Multi-color'],
    details: [
      "80 lined pages",
      "African pattern cover",
      "Lay-flat binding",
      "Acid-free paper",
      "Ribbon bookmark",
      "Elastic closure",
      "Inner pocket"
    ],
    specifications: {
      "Size": "A5 (5.8\" x 8.3\")",
      "Pages": "80 pages",
      "Paper": "80 GSM lined",
      "Binding": "Thread-sewn",
      "Cover": "Soft-touch laminated"
    }
  },
  {
    name: "Cultural Storybook Collection",
    slug: "cultural-storybook",
    description: "Collection of traditional African stories translated into English with cultural notes.",
    long_description: "Explore the rich storytelling traditions of Africa with this collection of traditional tales. Each story is beautifully illustrated and includes cultural context notes, making it perfect for young readers discovering African heritage. Stories are presented in English with key phrases in African languages.",
    price: 24.99,
    sale_price: null,
    images: [productImages['cultural-storybook']],
    featured: true,
    inventory_quantity: 25,
    collection_slug: 'books',
    sku: 'CSB-001',
    meta_title: 'African Cultural Storybook Collection - Traditional Tales',
    meta_description: 'Collection of traditional African stories with illustrations and cultural notes. Perfect for young readers.',
    tags: ['storybook', 'cultural', 'books', 'traditional-tales'],
    sizes: ['One Size'],
    colors: ['Multi-color'],
    details: [
      "10 traditional stories",
      "Full-color illustrations",
      "Cultural context notes",
      "Glossary of terms",
      "Age-appropriate content",
      "Hardcover binding",
      "48 pages"
    ],
    specifications: {
      "Pages": "48 pages",
      "Dimensions": "8.5\" x 11\"",
      "Binding": "Hardcover",
      "Illustrations": "Full color",
      "Reading Level": "Ages 5-12"
    }
  },
  {
    name: "iSPEAK Backpack",
    slug: "ispeak-backpack",
    description: "Durable school backpack with Paji mascot design, perfect for carrying learning materials.",
    long_description: "This colorful and durable backpack features our beloved Paji mascot and is designed specifically for young learners. With multiple compartments, padded straps, and water-resistant material, it's perfect for school, language lessons, or everyday adventures.",
    price: 34.99,
    sale_price: null,
    images: [productImages['ispeak-backpack']],
    featured: false,
    inventory_quantity: 20,
    collection_slug: 'accessories',
    sku: 'IBP-001',
    meta_title: 'iSPEAK Kids Backpack - Paji Mascot School Bag',
    meta_description: 'Durable school backpack with Paji mascot design. Multiple compartments and padded straps for comfort.',
    tags: ['backpack', 'school-bag', 'accessories', 'paji'],
    sizes: ['Kids Size'],
    colors: ['Blue/Yellow'],
    details: [
      "Water-resistant material",
      "Padded adjustable straps",
      "Multiple compartments",
      "Side water bottle pockets",
      "Reflective safety strips",
      "Padded back panel",
      "Name tag pocket"
    ],
    specifications: {
      "Dimensions": "16\" x 12\" x 6\"",
      "Material": "600D Polyester",
      "Capacity": "20 liters",
      "Weight": "1.2 lbs",
      "Age Range": "5-12 years"
    }
  },
  {
    name: "Language Poster Set",
    slug: "language-poster-set",
    description: "Educational poster set featuring alphabets and common phrases in all four iSPEAK languages.",
    long_description: "Transform any learning space with this comprehensive poster set featuring alphabets, numbers, and common phrases in Yoruba, Kiswahili, Twi, and Amharic. Each poster is beautifully designed with vibrant colors and clear typography, making it perfect for classrooms, playrooms, or study areas.",
    price: 19.99,
    sale_price: null,
    images: [productImages['language-poster-set']],
    featured: false,
    inventory_quantity: 30,
    collection_slug: 'educational',
    sku: 'LPS-001',
    meta_title: 'African Language Poster Set - Educational Wall Charts',
    meta_description: 'Set of 4 educational posters featuring alphabets and phrases in Yoruba, Kiswahili, Twi, and Amharic.',
    tags: ['posters', 'educational', 'wall-chart', 'alphabet'],
    sizes: ['18" x 24"'],
    colors: ['Multi-color'],
    details: [
      "Set of 4 posters",
      "One for each language",
      "Alphabet and numbers",
      "Common phrases",
      "Pronunciation guides",
      "Laminated finish",
      "Ready to hang"
    ],
    specifications: {
      "Size": "18\" x 24\" each",
      "Material": "Heavy cardstock",
      "Finish": "UV laminated",
      "Set Contents": "4 posters",
      "Printing": "Full color, high resolution"
    }
  },
  {
    name: "iSPEAK Cap",
    slug: "ispeak-cap",
    description: "Adjustable cap with embroidered iSPEAK logo, perfect for outdoor activities and events.",
    long_description: "Show your iSPEAK pride with this comfortable adjustable cap featuring an embroidered logo. Made from breathable cotton with a pre-curved visor, it's perfect for outdoor activities, school events, or everyday wear. One size fits most with an adjustable strap.",
    price: 16.99,
    sale_price: null,
    images: [productImages['ispeak-cap']],
    featured: false,
    inventory_quantity: 45,
    collection_slug: 'apparel',
    sku: 'ICP-001',
    meta_title: 'iSPEAK Adjustable Cap - Embroidered Logo Hat',
    meta_description: 'Comfortable cotton cap with embroidered iSPEAK logo. Adjustable strap fits most head sizes.',
    tags: ['cap', 'hat', 'apparel', 'accessories'],
    sizes: ['One Size'],
    colors: ['Navy', 'Yellow'],
    details: [
      "100% cotton twill",
      "Embroidered logo",
      "Pre-curved visor",
      "Adjustable strap",
      "Ventilation eyelets",
      "Structured crown",
      "Sweatband inside"
    ],
    specifications: {
      "Material": "100% Cotton twill",
      "Closure": "Adjustable strap",
      "Crown": "Structured, 6-panel",
      "Visor": "Pre-curved",
      "Size": "One size fits most"
    }
  },
  {
    name: "Teacher Coffee Mug",
    slug: "teacher-coffee-mug",
    description: "Ceramic mug with inspirational message for language educators and parents.",
    long_description: "Start your day with inspiration using this beautifully designed ceramic mug. Features an uplifting message about language education and the iSPEAK logo. Perfect for teachers, parents, or anyone supporting African language learning. Microwave and dishwasher safe.",
    price: 12.99,
    sale_price: null,
    images: [productImages['teacher-coffee-mug']],
    featured: false,
    inventory_quantity: 50,
    collection_slug: 'accessories',
    sku: 'TCM-001',
    meta_title: 'Teacher Coffee Mug - iSPEAK Language Educator Gift',
    meta_description: 'Ceramic coffee mug with inspirational message for language educators. Dishwasher and microwave safe.',
    tags: ['mug', 'teacher-gift', 'accessories', 'coffee'],
    sizes: ['11 oz'],
    colors: ['White/Yellow'],
    details: [
      "High-quality ceramic",
      "11 oz capacity",
      "Dishwasher safe",
      "Microwave safe",
      "Comfortable handle",
      "Vibrant printing",
      "Gift box available"
    ],
    specifications: {
      "Capacity": "11 oz",
      "Material": "Ceramic",
      "Printing": "Sublimation",
      "Dimensions": "3.75\" x 3.2\"",
      "Care": "Dishwasher and microwave safe"
    }
  },
  {
    name: "iSPEAK Hoodie",
    slug: "ispeak-hoodie",
    description: "Cozy hoodie with iSPEAK branding, perfect for cooler weather and casual wear.",
    long_description: "Stay warm and show your support for African language education with this comfortable hoodie. Features the iSPEAK logo on the front and a kangaroo pocket for convenience. Made from a soft cotton-polyester blend, it's perfect for cooler days or casual wear.",
    price: 39.99,
    sale_price: null,
    images: [productImages['ispeak-hoodie']],
    featured: false,
    inventory_quantity: 25,
    collection_slug: 'apparel',
    sku: 'IHD-001',
    meta_title: 'iSPEAK Hoodie - Comfortable Cotton Blend Sweatshirt',
    meta_description: 'Cozy hoodie with iSPEAK logo. Cotton-polyester blend with kangaroo pocket. Perfect for casual wear.',
    tags: ['hoodie', 'apparel', 'sweatshirt', 'casual-wear'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Gray'],
    details: [
      "50/50 cotton-polyester blend",
      "Kangaroo pocket",
      "Drawstring hood",
      "Ribbed cuffs and waistband",
      "Double-needle stitching",
      "Pill-resistant fleece",
      "Machine washable"
    ],
    specifications: {
      "Material": "50% Cotton, 50% Polyester",
      "Weight": "8 oz fleece",
      "Hood": "Double-lined with drawstring",
      "Pocket": "Front kangaroo pocket",
      "Care": "Machine wash cold"
    }
  },
  {
    name: "Twi Counting Poster",
    slug: "twi-counting-poster",
    description: "Colorful educational poster teaching numbers 1-20 in Twi language.",
    long_description: "Help children learn to count in Twi with this vibrant educational poster. Features numbers 1-20 with phonetic pronunciation guides and colorful illustrations. Perfect for classrooms, homeschool spaces, or children's bedrooms. Printed on durable, tear-resistant material.",
    price: 8.99,
    sale_price: null,
    images: [productImages['twi-counting-poster']],
    featured: false,
    inventory_quantity: 40,
    collection_slug: 'educational',
    sku: 'TCP-001',
    meta_title: 'Twi Counting Poster - Numbers 1-20 Educational Chart',
    meta_description: 'Educational poster teaching numbers 1-20 in Twi language with pronunciation guides and illustrations.',
    tags: ['poster', 'twi', 'counting', 'educational'],
    sizes: ['18" x 24"'],
    colors: ['Multi-color'],
    details: [
      "Numbers 1-20 in Twi",
      "Phonetic pronunciation",
      "Colorful illustrations",
      "Tear-resistant material",
      "UV-resistant printing",
      "Ready to hang",
      "Educational guide included"
    ],
    specifications: {
      "Size": "18\" x 24\"",
      "Material": "Heavy-duty poster paper",
      "Finish": "Matte lamination",
      "Language": "Twi with English",
      "Content": "Numbers 1-20"
    }
  },
  {
    name: "Amharic Writing Workbook",
    slug: "amharic-writing-workbook",
    description: "Practice workbook for learning Amharic script with guided exercises and practice sheets.",
    long_description: "Master the beautiful Amharic script with this comprehensive writing workbook. Features step-by-step guides for each character, practice exercises, and plenty of space for writing practice. Includes cultural notes and common words to reinforce learning.",
    price: 14.99,
    sale_price: null,
    images: [productImages['amharic-writing-workbook']],
    featured: false,
    inventory_quantity: 35,
    collection_slug: 'books',
    sku: 'AWW-001',
    meta_title: 'Amharic Writing Workbook - Learn Ethiopian Script',
    meta_description: 'Comprehensive workbook for learning Amharic script with guided exercises and practice sheets.',
    tags: ['workbook', 'amharic', 'writing', 'educational'],
    sizes: ['8.5" x 11"'],
    colors: ['Multi-color'],
    details: [
      "64 practice pages",
      "Step-by-step character guides",
      "Practice exercises",
      "Cultural notes",
      "Progress tracking",
      "Perforated pages",
      "Answer key included"
    ],
    specifications: {
      "Pages": "64 pages",
      "Size": "8.5\" x 11\"",
      "Binding": "Spiral bound",
      "Paper": "Premium writing paper",
      "Level": "Beginner to Intermediate"
    }
  }
]

async function populateDatabase() {
  try {
    console.log('🚀 Starting database population...')
    
    // Step 1: Insert collections
    console.log('\n📁 Inserting product collections...')
    for (const collection of collections) {
      const { data, error } = await supabase
        .from('product_collections')
        .upsert(collection, { onConflict: 'slug' })
        .select()
      
      if (error) {
        console.error(`❌ Error inserting collection ${collection.name}:`, error)
      } else {
        console.log(`✅ Inserted collection: ${collection.name}`)
      }
    }
    
    // Step 2: Get collection IDs
    console.log('\n🔍 Fetching collection IDs...')
    const { data: dbCollections, error: collectionsError } = await supabase
      .from('product_collections')
      .select('id, slug')
    
    if (collectionsError) {
      console.error('❌ Error fetching collections:', collectionsError)
      return
    }
    
    const collectionMap = {}
    dbCollections.forEach(col => {
      collectionMap[col.slug] = col.id
    })
    
    // Step 3: Insert products
    console.log('\n📦 Inserting products...')
    for (const product of products) {
      // Prepare product data
      const productData = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        long_description: product.long_description,
        price: product.price,
        sale_price: product.sale_price,
        images: product.images,
        featured: product.featured,
        inventory_quantity: product.inventory_quantity,
        collection_id: collectionMap[product.collection_slug],
        sku: product.sku,
        meta_title: product.meta_title,
        meta_description: product.meta_description,
        tags: product.tags,
        details: product.details,
        specifications: product.specifications,
        is_active: true
      }
      
      // Insert product
      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .upsert(productData, { onConflict: 'slug' })
        .select()
        .single()
      
      if (productError) {
        console.error(`❌ Error inserting product ${product.name}:`, productError)
        continue
      }
      
      console.log(`✅ Inserted product: ${product.name}`)
      
      // Step 4: Insert product variants
      if (product.sizes && product.colors) {
        console.log(`   📐 Creating variants for ${product.name}...`)
        
        for (const size of product.sizes) {
          for (const color of product.colors) {
            const variantData = {
              product_id: insertedProduct.id,
              size: size,
              color: color,
              sku: `${product.sku}-${size}-${color}`.toUpperCase().replace(/\s+/g, ''),
              price: product.price,
              inventory_quantity: Math.floor(product.inventory_quantity / (product.sizes.length * product.colors.length)),
              is_active: true
            }
            
            const { error: variantError } = await supabase
              .from('product_variants')
              .upsert(variantData, { onConflict: 'sku' })
            
            if (variantError) {
              console.error(`   ❌ Error inserting variant ${variantData.sku}:`, variantError)
            }
          }
        }
        console.log(`   ✅ Created ${product.sizes.length * product.colors.length} variants`)
      }
    }
    
    console.log('\n🎉 Database population completed!')
    console.log(`📊 Summary: ${collections.length} collections, ${products.length} products`)
    
  } catch (error) {
    console.error('❌ Fatal error:', error)
  }
}

// Run the script
populateDatabase()