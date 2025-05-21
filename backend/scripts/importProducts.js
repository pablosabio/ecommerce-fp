// backend/scripts/importProducts.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

// Setup proper __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define your products array with the exact structure matching your frontend
const products = [
  {
    id: 'audio-001',
    name: 'ProSound Wireless Headphones',
    category: 'audio',
    price: 129.99,
    rating: 4.5,
    reviewCount: 127,
    description:
      'Experience superior sound quality with these noise-cancelling wireless headphones. Featuring 40 hours of battery life, comfortable over-ear design, and premium audio drivers for immersive listening.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306801/audio.1.1_doiw67.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306802/audio1.2_epsp1d.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306803/audio1.3_kwhsiy.avif',
    ],
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Bluetooth 5.2',
      'Built-in microphone',
      'Foldable design',
    ],
    inStock: true,
  },
  {
    id: 'audio-002',
    name: 'SoundWave Bluetooth Speaker',
    category: 'audio',
    price: 79.99,
    rating: 4.3,
    reviewCount: 89,
    description:
      'Fill any room with immersive 360-degree sound. This portable Bluetooth speaker delivers rich bass and clear highs with up to 12 hours of playback. Waterproof design makes it perfect for indoor and outdoor use.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306809/audio.2.1_nnbptl.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306810/audio.2.2_qtkktf.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306811/audio.2.3_wcqtpr.avif',
    ],
    features: [
      '360-degree sound',
      '12-hour battery life',
      'Waterproof (IPX7 rated)',
      'Bluetooth 5.0',
      'Built-in microphone for calls',
    ],
    inStock: true,
  },
  {
    id: 'audio-003',
    name: 'UltraBass True Wireless Earbuds',
    category: 'audio',
    price: 99.99,
    rating: 4.7,
    reviewCount: 112,
    description:
      'Experience deep bass and crystal-clear sound with these compact true wireless earbuds. Featuring active noise cancellation, touch controls, and seamless Bluetooth connectivity for an immersive audio experience.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306816/audio-3.1_g8mfv8.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306817/audio-3.2_i8gt9z.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306819/audio-3.3_b09lyk.avif',
    ],
    features: [
      'Active Noise Cancellation',
      'Touch controls',
      '30-hour total battery life with case',
      'IPX5 water resistance',
      'Voice assistant support',
    ],
    inStock: true,
  },
  {
    id: 'audio-004',
    name: 'AudioPro Home Theater System',
    category: 'audio',
    price: 549.99,
    rating: 4.8,
    reviewCount: 74,
    description:
      'Transform your living room into a cinema with this premium 5.1 channel home theater system. Featuring wireless surround speakers, powerful subwoofer, and advanced audio processing for an immersive entertainment experience.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306823/audio4.1_yluvl6.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306824/audio4.2_hwy02g.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306825/audio4.3_xg55pj.avif',
    ],
    features: [
      '5.1 channel surround sound',
      'Wireless rear speakers',
      '8-inch subwoofer',
      'HDMI ARC connectivity',
      'Bluetooth streaming',
    ],
    inStock: true,
  },
  {
    id: 'audio-005',
    name: 'VinylMaster Turntable',
    category: 'audio',
    price: 199.99,
    rating: 4.6,
    reviewCount: 63,
    description:
      'Rediscover the warm sound of vinyl with this high-quality turntable. Featuring a belt-drive system, adjustable counterweight, and built-in preamp for connecting to any audio system.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306828/audio5.1_gox8av.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306830/audio5.2_r243ht.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306831/audio5.3_mdrji7.avif',
    ],
    features: [
      'Belt-drive system',
      'Built-in phono preamp',
      'Adjustable counterweight',
      'USB connectivity for digital recording',
      'Solid wood base',
    ],
    inStock: true,
  },
  {
    id: 'computers-001',
    name: 'UltraBook Pro 15',
    category: 'computers',
    price: 1299.99,
    rating: 4.7,
    reviewCount: 156,
    description:
      'Powerful performance in an ultra-thin design. Features the latest processor, stunning 4K display, and all-day battery life. Perfect for creative professionals and power users who need reliability and speed.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306737/comp1.1_rljskq.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306738/comp1.2_kph3ab.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306738/comp1.3_d9vpxj.avif',
    ],
    features: [
      'Latest generation processor',
      '16GB RAM, 512GB SSD',
      '15.6-inch 4K touch display',
      'Backlit keyboard',
      'Thunderbolt 4 ports',
    ],
    inStock: true,
  },
  {
    id: 'computers-002',
    name: 'PowerDesk Gaming PC',
    category: 'computers',
    price: 1899.99,
    rating: 4.9,
    reviewCount: 78,
    description:
      'Experience next-level gaming with this high-performance desktop. Equipped with the latest graphics card, multi-core processor, and customizable RGB lighting, it delivers smooth gameplay at max settings.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306751/comp2.1_vslmnb.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306752/comp2.2_sfsemj.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306753/comp2.3_qcwqe7.avif',
    ],
    features: [
      'High-end graphics card',
      '32GB RAM, 1TB SSD + 2TB HDD',
      'Liquid cooling system',
      'Customizable RGB lighting',
      'Tool-less upgrade design',
    ],
    inStock: true,
  },
  {
    id: 'computers-003',
    name: 'ProTab Convertible Laptop',
    category: 'computers',
    price: 899.99,
    rating: 4.4,
    reviewCount: 92,
    description:
      'Versatility meets performance with this 2-in-1 convertible laptop. Use it as a traditional laptop or fold it into tablet mode for drawing and note-taking with the included stylus pen.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306757/comp3.1_mfmzuz.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306758/comp3.2_uapvp8.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306759/comp3.3_sa9red.avif',
    ],
    features: [
      'Convertible 2-in-1 design',
      '13.3-inch Full HD touchscreen',
      'Included stylus pen',
      '12-hour battery life',
      'Fingerprint reader',
    ],
    inStock: true,
  },
  {
    id: 'computers-004',
    name: 'CompactDesk Mini PC',
    category: 'computers',
    price: 649.99,
    rating: 4.2,
    reviewCount: 53,
    description:
      'Powerful computing in a tiny package. This mini PC fits anywhere but delivers desktop-class performance for productivity, entertainment, and creative work.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306763/comp4.1_pk3kwb.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306764/comp4.2_jjnq8m.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306765/comp4.3_m48dsk.avif',
    ],
    features: [
      'Compact design',
      'Quad-core processor',
      '16GB RAM, 256GB SSD',
      'Wi-Fi 6 and Bluetooth 5.1',
      'Multiple display support',
    ],
    inStock: true,
  },
  {
    id: 'computers-005',
    name: 'WorkStation Pro Desktop',
    category: 'computers',
    price: 2199.99,
    rating: 4.8,
    reviewCount: 42,
    description:
      'Professional-grade workstation designed for intensive tasks like 3D rendering, video editing, and data analysis. Features server-class components in a quiet, efficient design.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306769/comp5.1_u1ayrk.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306770/comp5.2_iu7bht.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306771/comp5.3_kjsgul.avif',
    ],
    features: [
      'Professional-grade processor',
      '64GB ECC RAM',
      '2TB NVMe SSD + 4TB HDD',
      'Professional graphics card',
      'Tool-less chassis design',
    ],
    inStock: true,
  },
  {
    id: 'smartphones-001',
    name: 'Galaxy Pro 5G',
    category: 'smartphones',
    price: 899.99,
    rating: 4.6,
    reviewCount: 203,
    description:
      'Experience the future of mobile technology with our flagship smartphone. Featuring a stunning AMOLED display, professional-grade camera system, and the fastest 5G connectivity available.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306682/smart1.1_g0tj7i.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306682/smart1.2_urf1wq.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306683/smart1.3_kmqgy1.avif',
    ],
    features: [
      '6.7-inch Dynamic AMOLED display',
      'Triple camera system (50MP main)',
      '5G connectivity',
      '5000mAh battery',
      'Water and dust resistant (IP68)',
    ],
    inStock: true,
  },
  {
    id: 'smartphones-002',
    name: 'XPhone 13',
    category: 'smartphones',
    price: 999.99,
    rating: 4.8,
    reviewCount: 245,
    description:
      "The most advanced smartphone we've ever created. Featuring an edge-to-edge Super Retina display, revolutionary camera system, and all-day battery life for uncompromising performance.",
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306693/smart2.1_h1sy3v.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306694/smart2.2_xjraia.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306694/smart2.3_ohdaoo.avif',
    ],
    features: [
      '6.1-inch Super Retina XDR display',
      'Pro camera system with 3x optical zoom',
      'All-day battery life',
      'Face ID for secure authentication',
      '5G capable',
    ],
    inStock: true,
  },
  {
    id: 'smartphones-003',
    name: 'Pixel Ultra',
    category: 'smartphones',
    price: 849.99,
    rating: 4.7,
    reviewCount: 178,
    description:
      'Capture breathtaking photos and experience pure Android with the latest Pixel. Featuring the most advanced camera system yet, all-day battery life, and the fastest updates.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306698/smart3.1_akthdo.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306699/smart3.2_u5h6pc.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306700/smart3.3_hnedsb.avif',
    ],
    features: [
      '6.4-inch OLED display',
      'Advanced camera system with Night Sight',
      'Pure Android experience',
      'Three years of OS updates',
      'Fast wireless charging',
    ],
    inStock: true,
  },
  {
    id: 'smartphones-004',
    name: 'Essential Phone Lite',
    category: 'smartphones',
    price: 399.99,
    rating: 4.3,
    reviewCount: 109,
    description:
      'High performance at an affordable price. This midrange smartphone offers premium features like a high-refresh display, capable camera system, and all-day battery life without breaking the bank.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306705/smart4.1_ynx2hk.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306706/smart4.2_c4qdjm.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306707/smart4.3_v31n7s.avif',
    ],
    features: [
      '6.5-inch 90Hz LCD display',
      'Quad camera system',
      '5000mAh long-lasting battery',
      'Fast charging support',
      'Expandable storage',
    ],
    inStock: true,
  },
  {
    id: 'smartphones-005',
    name: 'Fold X Pro',
    category: 'smartphones',
    price: 1299.99,
    rating: 4.5,
    reviewCount: 87,
    description:
      'Experience the future of smartphones with this innovative folding design. Use it as a compact phone or unfold it into a tablet-sized screen for immersive viewing and multitasking.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306711/smart5.1_hxl2ec.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306712/smart5.2_vssfm8.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306712/smart5.3_ydzj3o.avif',
    ],
    features: [
      '7.6-inch folding AMOLED display',
      '4.6-inch cover display',
      'Triple camera system',
      'App Continuity between screens',
      'S Pen compatible',
    ],
    inStock: true,
  },
  {
    id: 'accessories-001',
    name: 'Premium Wireless Mouse',
    category: 'accessories',
    price: 49.99,
    rating: 4.4,
    reviewCount: 67,
    description:
      'Enhance your workflow with this ergonomic wireless mouse. Featuring precision tracking, customizable buttons, and long battery life for uninterrupted productivity.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306522/acc1.1_eqnciy.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306522/acc1.2_mp79ih.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306522/acc1.3_fhrddo.avif',
    ],
    features: [
      'Ergonomic design',
      '4000 DPI precision tracking',
      '6 programmable buttons',
      '6-month battery life',
      'Multi-device connectivity',
    ],
    inStock: true,
  },
  {
    id: 'accessories-002',
    name: 'Mechanical Keyboard RGB',
    category: 'accessories',
    price: 89.99,
    rating: 4.7,
    reviewCount: 113,
    description:
      'Experience tactile feedback and precision with this mechanical keyboard. Featuring customizable RGB lighting, programmable keys, and durable construction for gaming and typing enthusiasts.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306587/acc2.1_t1uohm.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306587/acc2.2_xfrbr1.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306587/acc2.3_tdvlzy.avif',
    ],
    features: [
      'Cherry MX switches',
      'Full RGB backlighting',
      'N-key rollover',
      'Customizable macros',
      'Detachable wrist rest',
    ],
    inStock: true,
  },
  {
    id: 'accessories-003',
    name: 'UltraView 27" Monitor',
    category: 'accessories',
    price: 349.99,
    rating: 4.6,
    reviewCount: 89,
    description:
      'Expand your visual workspace with this 27-inch 4K monitor. Featuring vibrant colors, wide viewing angles, and eye-care technology for comfortable all-day use.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306597/acc3.2_fpur3i.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306596/acc3.1_ehhd5h.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306597/acc3.3_ep2fje.avif',
    ],
    features: [
      '27-inch 4K UHD display',
      '99% sRGB color accuracy',
      'Eye-care technology',
      'Adjustable height and tilt',
      'Multiple connectivity options',
    ],
    inStock: true,
  },
  {
    id: 'accessories-004',
    name: 'PowerHub USB-C Dock',
    category: 'accessories',
    price: 79.99,
    rating: 4.5,
    reviewCount: 72,
    description:
      'Expand your connectivity options with this versatile USB-C dock. Connect multiple displays, USB devices, and charge your laptop all through a single cable.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306605/acc4.1_acoqvq.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306605/acc4.2_gex6gh.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306605/acc4.3_an2s34.avif',
    ],
    features: [
      '11-in-1 connectivity',
      'Dual 4K display support',
      '100W Power Delivery',
      'Gigabit Ethernet',
      'SD and microSD card readers',
    ],
    inStock: true,
  },
  {
    id: 'accessories-005',
    name: 'ComfortPro Ergonomic Chair',
    category: 'accessories',
    price: 249.99,
    rating: 4.8,
    reviewCount: 58,
    description:
      'Enhance your comfort during long work sessions with this ergonomic office chair. Featuring adjustable lumbar support, breathable mesh back, and customizable armrests for optimal positioning.',
    images: [
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306615/acc5.2_amgajd.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306615/acc5.1_j95ayt.avif',
      'https://res.cloudinary.com/dnhduqv8j/image/upload/v1747306615/acc.5.3_ymkywp.avif',
    ],
    features: [
      'Adjustable lumbar support',
      'Breathable mesh back',
      '3D adjustable armrests',
      'Weight-activated tilt mechanism',
      '5-year warranty',
    ],
    inStock: true,
  },
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Import products
const importProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products deleted');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products imported successfully`);

    // Group and count products by category
    const categoryCounts = {};
    products.forEach((product) => {
      if (!categoryCounts[product.category]) {
        categoryCounts[product.category] = 0;
      }
      categoryCounts[product.category]++;
    });

    // Log category statistics
    console.log('\nProducts by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} products`);
    });

    // Success, exit with code 0
    process.exit(0);
  } catch (error) {
    console.error(`Error importing products: ${error.message}`);
    process.exit(1);
  }
};

// Run the import function
importProducts();
