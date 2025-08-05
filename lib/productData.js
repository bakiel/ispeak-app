// Comprehensive Product Data System for iSPEAK E-commerce
// This is a production-ready mock data system that simulates a live database
// Ready for future Supabase integration

import { getProductImage, getProductImages } from './productImages'

// Collections/Categories
export const collections = [
  { id: 1, name: "Apparel", slug: "apparel", display_order: 1, description: "Comfortable clothing featuring Paji and iSPEAK branding" },
  { id: 2, name: "School Supplies", slug: "school-supplies", display_order: 2, description: "Educational supplies for language learning" },
  { id: 3, name: "Educational", slug: "educational", display_order: 3, description: "Learning materials and educational resources" },
  { id: 4, name: "Toys", slug: "toys", display_order: 4, description: "Fun toys and games for language learning" },
  { id: 5, name: "Books", slug: "books", display_order: 5, description: "Language learning books and guides" },
  { id: 6, name: "Accessories", slug: "accessories", display_order: 6, description: "Bags, bottles, and lifestyle accessories" }
]

// Complete product catalog with all 18 products
export const products = [
  // 1. Paji T-Shirt - Kids
  {
    id: 1,
    name: "Paji T-Shirt - Kids",
    slug: "paji-t-shirt-kids",
    price: 24.99,
    sale_price: null,
    images: getProductImages('paji-t-shirt-kids'),
    featured: true,
    inventory_quantity: 45,
    collection: { id: 1, name: "Apparel", slug: "apparel" },
    description: "Comfortable cotton t-shirt featuring our beloved Paji mascot. Perfect for young language learners to show their pride in African heritage while learning.",
    long_description: "This premium cotton t-shirt showcases the vibrant spirit of iSPEAK through our beloved Paji mascot. Designed specifically for children ages 3-14, this comfortable and durable shirt is perfect for everyday wear, language learning sessions, or showing cultural pride. The high-quality print features Paji in traditional African-inspired colors, making it both educational and stylish. Made with organic cotton and printed with eco-friendly inks.",
    details: [
      "100% organic cotton material",
      "Machine washable in cold water",
      "Available in sizes 3T-14",
      "Vibrant, fade-resistant print",
      "Ethically manufactured with fair trade practices",
      "Pre-shrunk fabric",
      "Reinforced seams for durability",
      "Eco-friendly water-based inks"
    ],
    sizes: ["3T", "4T", "5T", "6", "7", "8", "10", "12", "14"],
    colors: ["Yellow", "Blue", "Green", "Red"],
    variants: [
      { id: 1, size: "3T", color: "Yellow", sku: "PTS-3T-YEL", price: 24.99, inventory: 12 },
      { id: 2, size: "4T", color: "Yellow", sku: "PTS-4T-YEL", price: 24.99, inventory: 8 },
      { id: 3, size: "6", color: "Blue", sku: "PTS-6-BLU", price: 24.99, inventory: 15 },
      { id: 4, size: "8", color: "Green", sku: "PTS-8-GRN", price: 24.99, inventory: 10 }
    ],
    specifications: {
      "Material": "100% Organic Cotton",
      "Weight": "180 GSM",
      "Fit": "Regular",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Ghana",
      "Certifications": "GOTS Certified Organic"
    },
    reviews: {
      average: 4.8,
      count: 47,
      breakdown: { 5: 38, 4: 7, 3: 2, 2: 0, 1: 0 }
    },
    seo: {
      title: "Paji T-Shirt for Kids - African Language Learning Apparel",
      metaDescription: "Organic cotton kids t-shirt featuring Paji mascot. Perfect for young African language learners. Available in sizes 3T-14."
    },
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01"
  },

  // 2. iSPEAK Learning Journal
  {
    id: 2,
    name: "iSPEAK Learning Journal",
    slug: "ispeak-learning-journal",
    price: 19.99,
    sale_price: 15.99,
    images: getProductImages('ispeak-learning-journal'),
    featured: true,
    inventory_quantity: 75,
    collection: { id: 2, name: "School Supplies", slug: "school-supplies" },
    description: "Beautiful hardcover journal designed specifically for tracking language learning progress. Includes vocabulary sections, cultural notes, and progress tracking pages.",
    long_description: "This beautifully crafted learning journal is the perfect companion for any young language learner. Featuring 120 pages of high-quality paper with specially designed templates for vocabulary tracking, cultural notes, and progress monitoring. The journal includes sections for all four languages taught at iSPEAK: Yoruba, Kiswahili, Twi, and Amharic. Each section is color-coded and includes cultural artwork from respective regions.",
    details: [
      "120 pages of high-quality, acid-free paper",
      "Durable hardcover binding with lay-flat design",
      "African-inspired cover artwork by local artists",
      "Progress tracking templates for all skill levels",
      "Cultural learning sections with prompts",
      "Vocabulary pages with pronunciation guides",
      "Goal-setting and reflection pages",
      "Ribbon bookmark included"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 5, size: "One Size", color: "Multi-color", sku: "ILJ-OS-MC", price: 15.99, inventory: 75 }
    ],
    specifications: {
      "Dimensions": "8.5\" x 11\"",
      "Pages": "120 pages",
      "Paper": "90 GSM acid-free paper",
      "Binding": "Hardcover with PUR binding",
      "Cover": "Matte finish with spot UV accents",
      "Features": "Elastic band closure, ribbon bookmark"
    },
    reviews: {
      average: 4.9,
      count: 23,
      breakdown: { 5: 21, 4: 2, 3: 0, 2: 0, 1: 0 }
    },
    seo: {
      title: "iSPEAK Learning Journal - African Language Progress Tracker",
      metaDescription: "Premium learning journal for tracking African language progress. 120 pages with templates for Yoruba, Kiswahili, Twi, and Amharic."
    },
    isActive: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-12-01"
  },

  // 3. Yoruba Alphabet Flashcards
  {
    id: 3,
    name: "Yoruba Alphabet Flashcards",
    slug: "yoruba-alphabet-flashcards",
    price: 12.99,
    sale_price: null,
    images: getProductImages('yoruba-alphabet-flashcards'),
    featured: true,
    inventory_quantity: 30,
    collection: { id: 3, name: "Educational", slug: "educational" },
    description: "Interactive flashcards for learning Yoruba alphabet with pronunciation guides and cultural context.",
    long_description: "Master the Yoruba alphabet with these beautifully illustrated flashcards. Each card features a letter, pronunciation guide, example word, and cultural illustration to make learning engaging and memorable. Created in partnership with native Yoruba speakers and educators from Nigeria.",
    details: [
      "52 double-sided cards covering full Yoruba alphabet",
      "Pronunciation guides with tonal marks",
      "Cultural context and example words",
      "Durable 350GSM cardstock material",
      "Educational activity suggestions included",
      "Storage box included",
      "Created with native Yoruba educators"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 6, size: "One Size", color: "Multi-color", sku: "YAF-OS-MC", price: 12.99, inventory: 30 }
    ],
    specifications: {
      "Card Count": "52 cards",
      "Dimensions": "3.5\" x 5\" per card",
      "Material": "350 GSM cardstock",
      "Finish": "Matte with rounded corners",
      "Storage": "Included storage box",
      "Languages": "Yoruba with English translations"
    },
    reviews: {
      average: 4.7,
      count: 15,
      breakdown: { 5: 12, 4: 2, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "Yoruba Alphabet Flashcards - Learn Nigerian Language",
      metaDescription: "52 premium flashcards for learning Yoruba alphabet. Includes pronunciation guides and cultural context from native speakers."
    },
    isActive: true,
    createdAt: "2024-02-01",
    updatedAt: "2024-12-01"
  },

  // 4. Paji Plush Toy
  {
    id: 4,
    name: "Paji Plush Toy",
    slug: "paji-plush-toy",
    price: 29.99,
    sale_price: null,
    images: getProductImages('paji-plush-toy'),
    featured: false,
    inventory_quantity: 25,
    collection: { id: 4, name: "Toys", slug: "toys" },
    description: "Soft and cuddly Paji mascot plush toy, perfect companion for language learning adventures.",
    long_description: "Bring the magic of iSPEAK home with this adorable Paji plush toy. Standing 12 inches tall, this soft and cuddly companion is perfect for children learning African languages. Made with hypoallergenic materials and featuring embroidered details, Paji is ready to join any learning adventure.",
    details: [
      "12 inches tall premium plush toy",
      "Super soft polyester filling",
      "Machine washable on gentle cycle",
      "Safety tested for ages 3+",
      "Embroidered facial features (no small parts)",
      "Hypoallergenic materials",
      "CE and CPSIA safety certified"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 7, size: "One Size", color: "Multi-color", sku: "PPT-OS-MC", price: 29.99, inventory: 25 }
    ],
    specifications: {
      "Height": "12 inches",
      "Material": "Premium polyester plush",
      "Filling": "Hypoallergenic polyester fiberfill",
      "Safety": "CE certified, CPSIA compliant",
      "Age Range": "3+ years",
      "Care": "Machine washable, air dry"
    },
    reviews: {
      average: 4.9,
      count: 18,
      breakdown: { 5: 16, 4: 2, 3: 0, 2: 0, 1: 0 }
    },
    seo: {
      title: "Paji Plush Toy - iSPEAK Mascot Stuffed Animal",
      metaDescription: "Adorable Paji mascot plush toy, 12 inches tall. Safe for ages 3+, machine washable, perfect learning companion."
    },
    isActive: true,
    createdAt: "2024-02-10",
    updatedAt: "2024-12-01"
  },

  // 5. Kiswahili Phrase Book
  {
    id: 5,
    name: "Kiswahili Phrase Book",
    slug: "kiswahili-phrase-book",
    price: 16.99,
    sale_price: null,
    images: getProductImages('kiswahili-phrase-book'),
    featured: false,
    inventory_quantity: 40,
    collection: { id: 5, name: "Books", slug: "books" },
    description: "Essential Kiswahili phrases for everyday conversation with pronunciation guides and cultural tips.",
    long_description: "Learn essential Kiswahili phrases with this comprehensive guide designed for beginners and intermediate learners. Features over 500 phrases organized by topic, from greetings to complex conversations. Written in collaboration with native speakers from Kenya and Tanzania.",
    details: [
      "Over 500 essential phrases organized by topic",
      "Clear pronunciation guides with audio references",
      "Cultural context notes for appropriate usage",
      "Topic-based organization for easy learning",
      "Beginner-friendly layout with large text",
      "Quick reference guide included",
      "Verified by native Kiswahili speakers"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 8, size: "One Size", color: "Multi-color", sku: "KPB-OS-MC", price: 16.99, inventory: 40 }
    ],
    specifications: {
      "Pages": "96 pages",
      "Dimensions": "5\" x 7\" (portable size)",
      "Binding": "Perfect bound with durable spine",
      "Paper": "80 GSM offset paper",
      "Cover": "Laminated for durability",
      "Content": "500+ phrases in 15 categories"
    },
    reviews: {
      average: 4.6,
      count: 22,
      breakdown: { 5: 16, 4: 4, 3: 2, 2: 0, 1: 0 }
    },
    seo: {
      title: "Kiswahili Phrase Book - Learn Swahili Conversations",
      metaDescription: "Essential Kiswahili phrase book with 500+ phrases. Perfect for beginners learning Swahili from Kenya and Tanzania."
    },
    isActive: true,
    createdAt: "2024-02-15",
    updatedAt: "2024-12-01"
  },

  // 6. African Heritage Water Bottle
  {
    id: 6,
    name: "African Heritage Water Bottle",
    slug: "african-heritage-water-bottle",
    price: 18.99,
    sale_price: 14.99,
    images: getProductImages('african-heritage-water-bottle'),
    featured: false,
    inventory_quantity: 35,
    collection: { id: 6, name: "Accessories", slug: "accessories" },
    description: "Eco-friendly water bottle with African-inspired design, perfect for staying hydrated during language lessons.",
    long_description: "Stay hydrated in style with this beautifully designed water bottle featuring authentic African patterns. Made from sustainable stainless steel with double-wall insulation to keep drinks cold for 24 hours or hot for 12 hours. The design celebrates African heritage with traditional patterns from various cultures.",
    details: [
      "BPA-free 18/8 stainless steel construction",
      "Leak-proof screw-on cap with carrying loop",
      "African-inspired artwork by local artists",
      "Keeps drinks cold for 24 hours, hot for 12 hours",
      "Easy-clean wide mouth opening",
      "Powder-coated exterior for durability",
      "Eco-friendly alternative to plastic bottles"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 9, size: "One Size", color: "Multi-color", sku: "AHW-OS-MC", price: 14.99, inventory: 35 }
    ],
    specifications: {
      "Capacity": "20 oz (590ml)",
      "Material": "18/8 Food-grade stainless steel",
      "Insulation": "Double-wall vacuum insulation",
      "Dimensions": "10.5\" x 2.8\"",
      "Weight": "14 oz empty",
      "Features": "Leak-proof, sweat-proof"
    },
    reviews: {
      average: 4.4,
      count: 16,
      breakdown: { 5: 10, 4: 4, 3: 2, 2: 0, 1: 0 }
    },
    seo: {
      title: "African Heritage Water Bottle - Insulated Stainless Steel",
      metaDescription: "20oz insulated water bottle with African heritage designs. Keeps drinks cold 24hrs, eco-friendly stainless steel."
    },
    isActive: true,
    createdAt: "2024-02-20",
    updatedAt: "2024-12-01"
  },

  // 7. iSPEAK Tote Bag
  {
    id: 7,
    name: "iSPEAK Tote Bag",
    slug: "ispeak-tote-bag",
    price: 16.99,
    sale_price: 12.99,
    images: getProductImages('ispeak-tote-bag'),
    featured: false,
    inventory_quantity: 28,
    collection: { id: 6, name: "Accessories", slug: "accessories" },
    description: "Durable canvas tote bag perfect for carrying books, supplies, and showing your iSPEAK pride.",
    long_description: "Carry your learning materials in style with this premium canvas tote bag. Made from 100% organic cotton canvas with reinforced handles and a spacious interior perfect for books, supplies, and daily essentials. Features the iSPEAK logo and inspirational African proverb.",
    details: [
      "100% organic cotton canvas construction",
      "Reinforced handles for heavy loads",
      "Spacious 15\" x 16\" interior",
      "Inside pocket for small items",
      "Machine washable for easy care",
      "Features inspirational African proverb",
      "Eco-friendly alternative to plastic bags"
    ],
    sizes: ["One Size"],
    colors: ["Natural", "Navy"],
    variants: [
      { id: 10, size: "One Size", color: "Natural", sku: "ITB-OS-NAT", price: 12.99, inventory: 18 },
      { id: 11, size: "One Size", color: "Navy", sku: "ITB-OS-NAV", price: 12.99, inventory: 10 }
    ],
    specifications: {
      "Dimensions": "15\" W x 16\" H x 4\" D",
      "Handle Drop": "10 inches",
      "Material": "12oz organic cotton canvas",
      "Features": "Interior pocket, reinforced handles",
      "Capacity": "Holds up to 20 lbs",
      "Care": "Machine wash cold, air dry"
    },
    reviews: {
      average: 4.5,
      count: 12,
      breakdown: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "iSPEAK Tote Bag - Organic Cotton Canvas Bag",
      metaDescription: "Durable organic cotton tote bag with iSPEAK branding. Perfect for books and supplies, machine washable."
    },
    isActive: true,
    createdAt: "2024-02-25",
    updatedAt: "2024-12-01"
  },

  // 8. Language Learning Cards
  {
    id: 8,
    name: "Language Learning Cards",
    slug: "language-learning-cards",
    price: 15.99,
    sale_price: null,
    images: getProductImages('language-learning-cards'),
    featured: true,
    inventory_quantity: 42,
    collection: { id: 3, name: "Educational", slug: "educational" },
    description: "Comprehensive set of learning cards covering basic vocabulary in all four iSPEAK languages.",
    long_description: "Master essential vocabulary across all four iSPEAK languages with this comprehensive card set. Each set includes 200 cards covering common words, phrases, and concepts in Yoruba, Kiswahili, Twi, and Amharic. Perfect for visual learners and group activities.",
    details: [
      "200 cards covering all four languages",
      "Color-coded by language for easy sorting",
      "High-quality illustrations for visual learning",
      "Pronunciation guides for every word",
      "Cultural context provided where relevant",
      "Durable cardstock with rounded corners",
      "Activity guide included with 10+ games"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 12, size: "One Size", color: "Multi-color", sku: "LLC-OS-MC", price: 15.99, inventory: 42 }
    ],
    specifications: {
      "Card Count": "200 cards (50 per language)",
      "Dimensions": "3.5\" x 5\" per card",
      "Material": "350 GSM coated cardstock",
      "Languages": "Yoruba, Kiswahili, Twi, Amharic",
      "Storage": "Sturdy storage box included",
      "Features": "Color-coded, rounded corners"
    },
    reviews: {
      average: 4.8,
      count: 25,
      breakdown: { 5: 20, 4: 4, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "Multi-Language Learning Cards - African Languages",
      metaDescription: "200 vocabulary cards for Yoruba, Kiswahili, Twi, and Amharic. Color-coded with pronunciation guides."
    },
    isActive: true,
    createdAt: "2024-03-01",
    updatedAt: "2024-12-01"
  },

  // 9. iSPEAK T-Shirt (Adult)
  {
    id: 9,
    name: "iSPEAK T-Shirt (Adult)",
    slug: "ispeak-t-shirt-adult",
    price: 26.99,
    sale_price: 22.99,
    images: getProductImages('ispeak-t-shirt'),
    featured: false,
    inventory_quantity: 38,
    collection: { id: 1, name: "Apparel", slug: "apparel" },
    description: "Premium adult t-shirt for parents, teachers, and supporters of African language education.",
    long_description: "Show your support for African language preservation with this premium adult t-shirt. Perfect for parents, educators, and anyone passionate about cultural preservation. Made from sustainable materials with a modern fit and inspiring messaging about the importance of language diversity.",
    details: [
      "100% organic cotton jersey",
      "Modern unisex fit",
      "Soft-hand screen print that won't crack",
      "Available in sizes XS-3XL",
      "Pre-shrunk and ring-spun for comfort",
      "Reinforced shoulder seams",
      "Inspirational messaging about language preservation"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "Navy", "Heather Gray"],
    variants: [
      { id: 13, size: "M", color: "Black", sku: "IST-M-BLK", price: 22.99, inventory: 12 },
      { id: 14, size: "L", color: "Navy", sku: "IST-L-NAV", price: 22.99, inventory: 15 },
      { id: 15, size: "XL", color: "Heather Gray", sku: "IST-XL-HGR", price: 22.99, inventory: 11 }
    ],
    specifications: {
      "Material": "100% Organic cotton jersey",
      "Weight": "4.5 oz/sq yd",
      "Fit": "Unisex modern fit",
      "Care": "Machine wash cold, tumble dry low",
      "Print": "Water-based inks",
      "Certifications": "GOTS certified organic"
    },
    reviews: {
      average: 4.6,
      count: 14,
      breakdown: { 5: 10, 4: 3, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "iSPEAK Adult T-Shirt - Support African Language Education",
      metaDescription: "Premium organic cotton adult t-shirt supporting African language preservation. Unisex fit in sizes XS-3XL."
    },
    isActive: true,
    createdAt: "2024-03-05",
    updatedAt: "2024-12-01"
  },

  // 10. African Patterns Notebook
  {
    id: 10,
    name: "African Patterns Notebook",
    slug: "african-patterns-notebook",
    price: 13.99,
    sale_price: null,
    images: getProductImages('african-patterns-notebook'),
    featured: false,
    inventory_quantity: 55,
    collection: { id: 2, name: "School Supplies", slug: "school-supplies" },
    description: "Beautiful spiral notebook featuring traditional African patterns, perfect for note-taking and journaling.",
    long_description: "Capture your thoughts and lessons in this beautifully designed notebook featuring authentic African patterns from various cultures. Each notebook includes 120 lined pages with subtle cultural motifs and educational facts about African heritage scattered throughout.",
    details: [
      "120 college-ruled lined pages",
      "Traditional African pattern cover designs",
      "Spiral binding for easy writing",
      "Perforated pages for clean removal",
      "Sturdy cardboard back cover",
      "Cultural facts and quotes throughout",
      "8.5\" x 11\" standard size"
    ],
    sizes: ["One Size"],
    colors: ["Kente", "Mudcloth", "Adinkra"],
    variants: [
      { id: 16, size: "One Size", color: "Kente", sku: "APN-OS-KEN", price: 13.99, inventory: 20 },
      { id: 17, size: "One Size", color: "Mudcloth", sku: "APN-OS-MUD", price: 13.99, inventory: 18 },
      { id: 18, size: "One Size", color: "Adinkra", sku: "APN-OS-ADI", price: 13.99, inventory: 17 }
    ],
    specifications: {
      "Pages": "120 college-ruled pages",
      "Dimensions": "8.5\" x 11\"",
      "Binding": "Wire-O spiral binding",
      "Paper": "70 GSM white paper",
      "Cover": "Heavy-duty cardstock",
      "Features": "Perforated pages, cultural facts"
    },
    reviews: {
      average: 4.3,
      count: 19,
      breakdown: { 5: 12, 4: 5, 3: 2, 2: 0, 1: 0 }
    },
    seo: {
      title: "African Patterns Notebook - Traditional Cultural Designs",
      metaDescription: "Spiral notebook with authentic African patterns. 120 pages with cultural facts, available in Kente, Mudcloth, Adinkra designs."
    },
    isActive: true,
    createdAt: "2024-03-10",
    updatedAt: "2024-12-01"
  },

  // 11. Cultural Storybook Collection
  {
    id: 11,
    name: "Cultural Storybook Collection",
    slug: "cultural-storybook-collection",
    price: 34.99,
    sale_price: 29.99,
    images: getProductImages('cultural-storybook'),
    featured: true,
    inventory_quantity: 20,
    collection: { id: 5, name: "Books", slug: "books" },
    description: "Collection of four beautifully illustrated storybooks featuring traditional tales from African cultures.",
    long_description: "Immerse children in rich African storytelling with this collection of four beautifully illustrated books. Each book represents one of the cultures behind our target languages: Yoruba, Kiswahili, Twi, and Amharic. Stories are presented in both the native language and English, with pronunciation guides and cultural context.",
    details: [
      "Four hardcover storybooks (32 pages each)",
      "Bilingual text in native language and English",
      "Beautiful illustrations by African artists",
      "Traditional tales from each culture",
      "Pronunciation guides included",
      "Cultural notes for parents and educators",
      "Comes in a beautiful gift box"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 19, size: "One Size", color: "Multi-color", sku: "CSC-OS-MC", price: 29.99, inventory: 20 }
    ],
    specifications: {
      "Books": "4 hardcover books",
      "Pages": "32 pages per book",
      "Dimensions": "8.5\" x 8.5\" per book",
      "Languages": "Bilingual (native + English)",
      "Illustrations": "Full-color throughout",
      "Packaging": "Gift box included"
    },
    reviews: {
      average: 4.9,
      count: 13,
      breakdown: { 5: 12, 4: 1, 3: 0, 2: 0, 1: 0 }
    },
    seo: {
      title: "African Cultural Storybook Collection - Bilingual Children's Books",
      metaDescription: "4 bilingual storybooks featuring traditional African tales. Yoruba, Kiswahili, Twi, and Amharic with English translations."
    },
    isActive: true,
    createdAt: "2024-03-15",
    updatedAt: "2024-12-01"
  },

  // 12. iSPEAK Backpack
  {
    id: 12,
    name: "iSPEAK Backpack",
    slug: "ispeak-backpack",
    price: 42.99,
    sale_price: null,
    images: getProductImages('ispeak-backpack'),
    featured: false,
    inventory_quantity: 18,
    collection: { id: 6, name: "Accessories", slug: "accessories" },
    description: "Durable school backpack with multiple compartments, perfect for students of all ages.",
    long_description: "Carry your learning adventures in this high-quality backpack designed for students of all ages. Features multiple compartments for organization, padded laptop sleeve, and comfortable straps for all-day wear. The vibrant design showcases African-inspired patterns alongside the iSPEAK branding.",
    details: [
      "Multiple compartments for organization",
      "Padded laptop sleeve fits up to 15\" laptops",
      "Comfortable padded shoulder straps",
      "Water-resistant 600D polyester fabric",
      "Front pocket with organizer panel",
      "Side pockets for water bottles",
      "Reflective safety strips"
    ],
    sizes: ["One Size"],
    colors: ["Navy", "Green"],
    variants: [
      { id: 20, size: "One Size", color: "Navy", sku: "ISB-OS-NAV", price: 42.99, inventory: 10 },
      { id: 21, size: "One Size", color: "Green", sku: "ISB-OS-GRN", price: 42.99, inventory: 8 }
    ],
    specifications: {
      "Dimensions": "18\" H x 13\" W x 7\" D",
      "Material": "600D water-resistant polyester",
      "Laptop Compartment": "Fits up to 15\" laptops",
      "Capacity": "30 liters",
      "Weight": "2.2 lbs",
      "Features": "Padded straps, reflective strips"
    },
    reviews: {
      average: 4.7,
      count: 9,
      breakdown: { 5: 7, 4: 2, 3: 0, 2: 0, 1: 0 }
    },
    seo: {
      title: "iSPEAK Student Backpack - Laptop Compatible School Bag",
      metaDescription: "Durable school backpack with laptop sleeve and multiple compartments. Water-resistant with African-inspired design."
    },
    isActive: true,
    createdAt: "2024-03-20",
    updatedAt: "2024-12-01"
  },

  // 13. Language Poster Set
  {
    id: 13,
    name: "Language Poster Set",
    slug: "language-poster-set",
    price: 24.99,
    sale_price: 19.99,
    images: getProductImages('language-poster-set'),
    featured: false,
    inventory_quantity: 32,
    collection: { id: 3, name: "Educational", slug: "educational" },
    description: "Set of four educational posters featuring alphabets, numbers, and common phrases in all iSPEAK languages.",
    long_description: "Transform any learning space with these vibrant educational posters. Each set includes four 18\"x24\" posters covering alphabets, numbers, and common phrases for Yoruba, Kiswahili, Twi, and Amharic. Perfect for classrooms, homeschool environments, or children's bedrooms.",
    details: [
      "Four 18\" x 24\" educational posters",
      "High-quality matte finish printing",
      "Covers alphabets, numbers, and phrases",
      "Colorful, engaging designs for children",
      "Educational content verified by native speakers",
      "Laminated for durability",
      "Comes with hanging strips"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 22, size: "One Size", color: "Multi-color", sku: "LPS-OS-MC", price: 19.99, inventory: 32 }
    ],
    specifications: {
      "Poster Count": "4 posters",
      "Dimensions": "18\" x 24\" each",
      "Material": "Premium poster paper",
      "Finish": "Matte lamination",
      "Languages": "Yoruba, Kiswahili, Twi, Amharic",
      "Features": "Hanging strips included"
    },
    reviews: {
      average: 4.6,
      count: 17,
      breakdown: { 5: 12, 4: 4, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "African Language Poster Set - Educational Wall Charts",
      metaDescription: "4 educational posters featuring alphabets and phrases in Yoruba, Kiswahili, Twi, and Amharic. 18x24 laminated."
    },
    isActive: true,
    createdAt: "2024-03-25",
    updatedAt: "2024-12-01"
  },

  // 14. iSPEAK Cap
  {
    id: 14,
    name: "iSPEAK Cap",
    slug: "ispeak-cap",
    price: 19.99,
    sale_price: null,
    images: getProductImages('ispeak-cap'),
    featured: false,
    inventory_quantity: 45,
    collection: { id: 1, name: "Apparel", slug: "apparel" },
    description: "Adjustable baseball cap with embroidered iSPEAK logo, perfect for sunny learning days.",
    long_description: "Protect yourself from the sun while showing your iSPEAK pride with this high-quality baseball cap. Features embroidered logo, adjustable strap, and breathable cotton construction. Perfect for outdoor learning activities or everyday wear.",
    details: [
      "100% cotton twill construction",
      "Embroidered iSPEAK logo on front",
      "Adjustable strap fits most sizes",
      "Pre-curved visor for sun protection",
      "Breathable cotton sweatband",
      "Structured 6-panel design",
      "Available in multiple colors"
    ],
    sizes: ["One Size"],
    colors: ["Navy", "Black", "Khaki"],
    variants: [
      { id: 23, size: "One Size", color: "Navy", sku: "ISC-OS-NAV", price: 19.99, inventory: 18 },
      { id: 24, size: "One Size", color: "Black", sku: "ISC-OS-BLK", price: 19.99, inventory: 15 },
      { id: 25, size: "One Size", color: "Khaki", sku: "ISC-OS-KHA", price: 19.99, inventory: 12 }
    ],
    specifications: {
      "Material": "100% cotton twill",
      "Fit": "Adjustable (fits most)",
      "Visor": "Pre-curved",
      "Closure": "Adjustable strap",
      "Features": "Embroidered logo, sweatband",
      "Care": "Hand wash recommended"
    },
    reviews: {
      average: 4.4,
      count: 11,
      breakdown: { 5: 7, 4: 3, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "iSPEAK Baseball Cap - Embroidered Logo Hat",
      metaDescription: "Adjustable cotton baseball cap with embroidered iSPEAK logo. Available in navy, black, and khaki colors."
    },
    isActive: true,
    createdAt: "2024-03-30",
    updatedAt: "2024-12-01"
  },

  // 15. Teacher Coffee Mug
  {
    id: 15,
    name: "Teacher Coffee Mug",
    slug: "teacher-coffee-mug",
    price: 14.99,
    sale_price: null,
    images: getProductImages('teacher-coffee-mug'),
    featured: false,
    inventory_quantity: 50,
    collection: { id: 6, name: "Accessories", slug: "accessories" },
    description: "Premium ceramic coffee mug for language educators with inspirational African proverb.",
    long_description: "Start each teaching day with inspiration from this beautiful ceramic mug featuring an inspirational African proverb about the power of language and education. Made from premium ceramic with a comfortable handle and microwave-safe construction.",
    details: [
      "Premium ceramic construction",
      "11 oz capacity perfect for coffee or tea",
      "Inspirational African proverb printed",
      "Comfortable C-handle design",
      "Microwave and dishwasher safe",
      "Vibrant colors that won't fade",
      "Perfect gift for educators"
    ],
    sizes: ["One Size"],
    colors: ["White", "Navy"],
    variants: [
      { id: 26, size: "One Size", color: "White", sku: "TCM-OS-WHT", price: 14.99, inventory: 30 },
      { id: 27, size: "One Size", color: "Navy", sku: "TCM-OS-NAV", price: 14.99, inventory: 20 }
    ],
    specifications: {
      "Capacity": "11 oz",
      "Material": "Premium ceramic",
      "Handle": "Comfortable C-handle",
      "Care": "Dishwasher and microwave safe",
      "Print": "Sublimation printing (fade-resistant)",
      "Features": "African proverb, iSPEAK logo"
    },
    reviews: {
      average: 4.8,
      count: 24,
      breakdown: { 5: 20, 4: 3, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "Teacher Coffee Mug - African Proverb Educator Gift",
      metaDescription: "11oz ceramic coffee mug with inspirational African proverb. Perfect gift for language educators and teachers."
    },
    isActive: true,
    createdAt: "2024-04-01",
    updatedAt: "2024-12-01"
  },

  // 16. iSPEAK Hoodie
  {
    id: 16,
    name: "iSPEAK Hoodie",
    slug: "ispeak-hoodie",
    price: 39.99,
    sale_price: 34.99,
    images: getProductImages('ispeak-hoodie'),
    featured: true,
    inventory_quantity: 22,
    collection: { id: 1, name: "Apparel", slug: "apparel" },
    description: "Warm and cozy hoodie featuring the iSPEAK logo, perfect for cooler learning days.",
    long_description: "Stay warm while showing your support for African language education with this premium hoodie. Made from a cotton-polyester blend for comfort and durability, featuring the iSPEAK logo and available in youth and adult sizes.",
    details: [
      "50% cotton, 50% polyester blend",
      "Kangaroo front pocket",
      "Adjustable drawstring hood",
      "Ribbed cuffs and hem",
      "Double-lined hood for extra warmth",
      "Pre-shrunk for consistent fit",
      "Available in youth and adult sizes"
    ],
    sizes: ["YS", "YM", "YL", "XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Gray", "Black"],
    variants: [
      { id: 28, size: "YM", color: "Navy", sku: "ISH-YM-NAV", price: 34.99, inventory: 8 },
      { id: 29, size: "M", color: "Gray", sku: "ISH-M-GRY", price: 34.99, inventory: 7 },
      { id: 30, size: "L", color: "Black", sku: "ISH-L-BLK", price: 34.99, inventory: 7 }
    ],
    specifications: {
      "Material": "50% cotton, 50% polyester",
      "Weight": "8 oz/sq yd",
      "Features": "Kangaroo pocket, drawstring hood",
      "Fit": "Unisex sizing",
      "Care": "Machine wash cold, tumble dry low",
      "Hood": "Double-lined for warmth"
    },
    reviews: {
      average: 4.7,
      count: 15,
      breakdown: { 5: 12, 4: 2, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "iSPEAK Hoodie - Comfortable Sweatshirt for Students",
      metaDescription: "Cozy cotton-polyester hoodie with iSPEAK logo. Available in youth and adult sizes, perfect for school."
    },
    isActive: true,
    createdAt: "2024-04-05",
    updatedAt: "2024-12-01"
  },

  // 17. Twi Counting Poster
  {
    id: 17,
    name: "Twi Counting Poster",
    slug: "twi-counting-poster",
    price: 9.99,
    sale_price: null,
    images: getProductImages('twi-counting-poster'),
    featured: false,
    inventory_quantity: 60,
    collection: { id: 3, name: "Educational", slug: "educational" },
    description: "Colorful educational poster teaching numbers 1-20 in Twi language with pronunciation guides.",
    long_description: "Help children learn numbers in Twi with this vibrant educational poster. Features numbers 1-20 with clear pronunciation guides and engaging illustrations. Perfect for classrooms, homeschool settings, or children's bedrooms. Created with input from native Twi speakers from Ghana.",
    details: [
      "Numbers 1-20 in Twi with English",
      "Clear pronunciation guides",
      "Colorful, child-friendly illustrations",
      "18\" x 24\" size perfect for walls",
      "Laminated for durability",
      "Verified by native Twi speakers",
      "Includes cultural context notes"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 31, size: "One Size", color: "Multi-color", sku: "TCP-OS-MC", price: 9.99, inventory: 60 }
    ],
    specifications: {
      "Dimensions": "18\" x 24\"",
      "Material": "Premium poster paper",
      "Finish": "Matte lamination",
      "Content": "Numbers 1-20 in Twi",
      "Features": "Pronunciation guides, illustrations",
      "Language": "Twi (Ghana)"
    },
    reviews: {
      average: 4.5,
      count: 8,
      breakdown: { 5: 6, 4: 1, 3: 1, 2: 0, 1: 0 }
    },
    seo: {
      title: "Twi Counting Poster - Learn Numbers in Ghanaian Language",
      metaDescription: "Educational poster teaching numbers 1-20 in Twi language. 18x24 laminated with pronunciation guides."
    },
    isActive: true,
    createdAt: "2024-04-10",
    updatedAt: "2024-12-01"
  },

  // 18. Amharic Writing Workbook
  {
    id: 18,
    name: "Amharic Writing Workbook",
    slug: "amharic-writing-workbook",
    price: 17.99,
    sale_price: null,
    images: getProductImages('amharic-writing-workbook'),
    featured: false,
    inventory_quantity: 35,
    collection: { id: 5, name: "Books", slug: "books" },
    description: "Comprehensive workbook for learning Amharic script with practice pages and cultural context.",
    long_description: "Master the beautiful Amharic script with this comprehensive workbook designed for beginners. Features step-by-step instructions for writing each character, practice pages, and cultural context about Ethiopian heritage. Perfect for students learning the unique writing system of Ethiopia.",
    details: [
      "Complete Amharic alphabet with writing guides",
      "Step-by-step stroke order instructions",
      "Practice pages for each character",
      "Cultural notes about Ethiopian heritage",
      "80 pages of structured lessons",
      "Created with Ethiopian educators",
      "Suitable for ages 8 and up"
    ],
    sizes: ["One Size"],
    colors: ["Multi-color"],
    variants: [
      { id: 32, size: "One Size", color: "Multi-color", sku: "AWW-OS-MC", price: 17.99, inventory: 35 }
    ],
    specifications: {
      "Pages": "80 pages",
      "Dimensions": "8.5\" x 11\"",
      "Binding": "Perfect bound",
      "Paper": "80 GSM practice paper",
      "Content": "Complete Amharic alphabet",
      "Age Range": "8+ years"
    },
    reviews: {
      average: 4.6,
      count: 7,
      breakdown: { 5: 5, 4: 2, 3: 0, 2: 0, 1: 0 }
    },
    seo: {
      title: "Amharic Writing Workbook - Learn Ethiopian Script",
      metaDescription: "80-page workbook for learning Amharic script. Step-by-step instructions with cultural context from Ethiopian educators."
    },
    isActive: true,
    createdAt: "2024-04-15",
    updatedAt: "2024-12-01"
  }
]

// Sample customer reviews for products
export const sampleReviews = [
  {
    id: 1,
    productId: 1,
    customerName: "Sarah M.",
    rating: 5,
    comment: "My daughter loves her Paji t-shirt! The quality is excellent and it's held up well after multiple washes.",
    verified: true,
    createdAt: "2024-11-15",
    helpful: 12
  },
  {
    id: 2,
    productId: 2,
    customerName: "Teacher Johnson",
    rating: 5,
    comment: "Perfect for tracking my students' progress. The journal is well-designed with plenty of space for notes.",
    verified: true,
    createdAt: "2024-11-10",
    helpful: 8
  },
  {
    id: 3,
    productId: 3,
    customerName: "Mom of 3",
    rating: 4,
    comment: "Great flashcards! The kids enjoy using them. Only wish there were more cards per set.",
    verified: true,
    createdAt: "2024-11-05",
    helpful: 5
  },
  {
    id: 4,
    productId: 15,
    customerName: "Ms. Patricia",
    rating: 5,
    comment: "Love starting my morning with this mug! The African proverb is so inspiring for my teaching day.",
    verified: true,
    createdAt: "2024-10-28",
    helpful: 15
  }
]

// Helper functions for data access
export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug && product.isActive)
}

export function getProductsByCollection(collectionSlug) {
  return products.filter(product => 
    product.collection.slug === collectionSlug && product.isActive
  )
}

export function getFeaturedProducts() {
  return products.filter(product => product.featured && product.isActive)
}

export function getRelatedProducts(productId, collectionSlug, limit = 4) {
  return products
    .filter(product => 
      product.id !== productId && 
      product.collection.slug === collectionSlug && 
      product.isActive
    )
    .slice(0, limit)
}

export function getProductReviews(productId) {
  return sampleReviews.filter(review => review.productId === productId)
}

export function searchProducts(query) {
  const searchTerm = query.toLowerCase()
  return products.filter(product => 
    product.isActive && (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.collection.name.toLowerCase().includes(searchTerm)
    )
  )
}

// Inventory management functions
export function getInventoryStatus(quantity) {
  if (quantity === 0) return { status: 'out-of-stock', label: 'Out of Stock', color: 'red' }
  if (quantity <= 5) return { status: 'low-stock', label: 'Low Stock', color: 'orange' }
  if (quantity <= 20) return { status: 'in-stock', label: 'In Stock', color: 'yellow' }
  return { status: 'well-stocked', label: 'In Stock', color: 'green' }
}

export function updateInventory(productId, quantity) {
  const product = products.find(p => p.id === productId)
  if (product) {
    product.inventory_quantity = Math.max(0, product.inventory_quantity - quantity)
    product.updatedAt = new Date().toISOString().split('T')[0]
  }
}

// Analytics helper (for future integration)
export function getProductAnalytics() {
  return {
    totalProducts: products.filter(p => p.isActive).length,
    totalInventory: products.reduce((sum, p) => sum + p.inventory_quantity, 0),
    lowStockCount: products.filter(p => p.inventory_quantity <= 5).length,
    averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
    featuredCount: products.filter(p => p.featured).length
  }
}

// Export default object for backward compatibility
export default {
  products,
  collections,
  sampleReviews,
  getProductBySlug,
  getProductsByCollection,
  getFeaturedProducts,
  getRelatedProducts,
  getProductReviews,
  searchProducts,
  getInventoryStatus,
  updateInventory,
  getProductAnalytics
}