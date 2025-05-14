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
    id: "audio-001",
    name: "ProSound Wireless Headphones",
    category: "audio",
    price: 129.99,
    rating: 4.5,
    reviewCount: 127,
    description: "Experience superior sound quality with these noise-cancelling wireless headphones. Featuring 40 hours of battery life, comfortable over-ear design, and premium audio drivers for immersive listening.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747229985/audio-001_gvznvt.webp",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.2",
      "Built-in microphone",
      "Foldable design"
    ],
    inStock: true
  },
  {
    id: "audio-002",
    name: "SoundWave Bluetooth Speaker",
    category: "audio",
    price: 79.99,
    rating: 4.3,
    reviewCount: 89,
    description: "Fill any room with immersive 360-degree sound. This portable Bluetooth speaker delivers rich bass and clear highs with up to 12 hours of playback. Waterproof design makes it perfect for indoor and outdoor use.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747229981/audio-002_ecjdc4.jpg",
    features: [
      "360-degree sound",
      "12-hour battery life",
      "Waterproof (IPX7 rated)",
      "Bluetooth 5.0",
      "Built-in microphone for calls"
    ],
    inStock: true
  },
  {
    id: "audio-003",
    name: "UltraBass True Wireless Earbuds",
    category: "audio",
    price: 99.99,
    rating: 4.7,
    reviewCount: 112,
    description: "Experience deep bass and crystal-clear sound with these compact true wireless earbuds. Featuring active noise cancellation, touch controls, and seamless Bluetooth connectivity for an immersive audio experience.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747229975/audio-003_ne5xy4.webp",
    features: [
      "Active Noise Cancellation",
      "Touch controls",
      "30-hour total battery life with case",
      "IPX5 water resistance",
      "Voice assistant support"
    ],
    inStock: true
  },
  {
    id: "audio-004",
    name: "AudioPro Home Theater System",
    category: "audio",
    price: 549.99,
    rating: 4.8,
    reviewCount: 74,
    description: "Transform your living room into a cinema with this premium 5.1 channel home theater system. Featuring wireless surround speakers, powerful subwoofer, and advanced audio processing for an immersive entertainment experience.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747229992/audio-004_sfi5qg.webp",
    features: [
      "5.1 channel surround sound",
      "Wireless rear speakers",
      "8-inch subwoofer",
      "HDMI ARC connectivity",
      "Bluetooth streaming"
    ],
    inStock: true
  },
  {
    id: "audio-005",
    name: "VinylMaster Turntable",
    category: "audio",
    price: 199.99,
    rating: 4.6,
    reviewCount: 63,
    description: "Rediscover the warm sound of vinyl with this high-quality turntable. Featuring a belt-drive system, adjustable counterweight, and built-in preamp for connecting to any audio system.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747229983/audio-005_fu7ohh.webp",
    features: [
      "Belt-drive system",
      "Built-in phono preamp",
      "Adjustable counterweight",
      "USB connectivity for digital recording",
      "Solid wood base"
    ],
    inStock: true
  },
  {
    id: "computers-001",
    name: "UltraBook Pro 15",
    category: "computers",
    price: 1299.99,
    rating: 4.7,
    reviewCount: 156,
    description: "Powerful performance in an ultra-thin design. Features the latest processor, stunning 4K display, and all-day battery life. Perfect for creative professionals and power users who need reliability and speed.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230105/computers-001_sbzcng.avif",
    features: [
      "Latest generation processor",
      "16GB RAM, 512GB SSD",
      "15.6-inch 4K touch display",
      "Backlit keyboard",
      "Thunderbolt 4 ports"
    ],
    inStock: true
  },
  {
    id: "computers-002",
    name: "PowerDesk Gaming PC",
    category: "computers",
    price: 1899.99,
    rating: 4.9,
    reviewCount: 78,
    description: "Experience next-level gaming with this high-performance desktop. Equipped with the latest graphics card, multi-core processor, and customizable RGB lighting, it delivers smooth gameplay at max settings.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230078/computers-002_qcep1o.avif",
    features: [
      "High-end graphics card",
      "32GB RAM, 1TB SSD + 2TB HDD",
      "Liquid cooling system",
      "Customizable RGB lighting",
      "Tool-less upgrade design"
    ],
    inStock: true
  },
  {
    id: "computers-003",
    name: "ProTab Convertible Laptop",
    category: "computers",
    price: 899.99,
    rating: 4.4,
    reviewCount: 92,
    description: "Versatility meets performance with this 2-in-1 convertible laptop. Use it as a traditional laptop or fold it into tablet mode for drawing and note-taking with the included stylus pen.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230070/computers-003_dokdlu.avif",
    features: [
      "Convertible 2-in-1 design",
      "13.3-inch Full HD touchscreen",
      "Included stylus pen",
      "12-hour battery life",
      "Fingerprint reader"
    ],
    inStock: true
  },
  {
    id: "computers-004",
    name: "CompactDesk Mini PC",
    category: "computers",
    price: 649.99,
    rating: 4.2,
    reviewCount: 53,
    description: "Powerful computing in a tiny package. This mini PC fits anywhere but delivers desktop-class performance for productivity, entertainment, and creative work.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230076/computers-004_mcljqv.avif",
    features: [
      "Compact design",
      "Quad-core processor",
      "16GB RAM, 256GB SSD",
      "Wi-Fi 6 and Bluetooth 5.1",
      "Multiple display support"
    ],
    inStock: true
  },
  {
    id: "computers-005",
    name: "WorkStation Pro Desktop",
    category: "computers",
    price: 2199.99,
    rating: 4.8,
    reviewCount: 42,
    description: "Professional-grade workstation designed for intensive tasks like 3D rendering, video editing, and data analysis. Features server-class components in a quiet, efficient design.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230116/computers-005_vnknaj.avif",
    features: [
      "Professional-grade processor",
      "64GB ECC RAM",
      "2TB NVMe SSD + 4TB HDD",
      "Professional graphics card",
      "Tool-less chassis design"
    ],
    inStock: true
  },
  {
    id: "smartphones-001",
    name: "Galaxy Pro 5G",
    category: "smartphones",
    price: 899.99,
    rating: 4.6,
    reviewCount: 203,
    description: "Experience the future of mobile technology with our flagship smartphone. Featuring a stunning AMOLED display, professional-grade camera system, and the fastest 5G connectivity available.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230077/smartphone-001_cvpohq.avif",
    features: [
      "6.7-inch Dynamic AMOLED display",
      "Triple camera system (50MP main)",
      "5G connectivity",
      "5000mAh battery",
      "Water and dust resistant (IP68)"
    ],
    inStock: true
  },
  {
    id: "smartphones-002",
    name: "XPhone 13",
    category: "smartphones",
    price: 999.99,
    rating: 4.8,
    reviewCount: 245,
    description: "The most advanced smartphone we've ever created. Featuring an edge-to-edge Super Retina display, revolutionary camera system, and all-day battery life for uncompromising performance.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230107/smartphone-002_qbrxsp.avif",
    features: [
      "6.1-inch Super Retina XDR display",
      "Pro camera system with 3x optical zoom",
      "All-day battery life",
      "Face ID for secure authentication",
      "5G capable"
    ],
    inStock: true
  },
  {
    id: "smartphones-003",
    name: "Pixel Ultra",
    category: "smartphones",
    price: 849.99,
    rating: 4.7,
    reviewCount: 178,
    description: "Capture breathtaking photos and experience pure Android with the latest Pixel. Featuring the most advanced camera system yet, all-day battery life, and the fastest updates.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230097/smartphone-003_mnszue.avif",
    features: [
      "6.4-inch OLED display",
      "Advanced camera system with Night Sight",
      "Pure Android experience",
      "Three years of OS updates",
      "Fast wireless charging"
    ],
    inStock: true
  },
  {
    id: "smartphones-004",
    name: "Essential Phone Lite",
    category: "smartphones",
    price: 399.99,
    rating: 4.3,
    reviewCount: 109,
    description: "High performance at an affordable price. This midrange smartphone offers premium features like a high-refresh display, capable camera system, and all-day battery life without breaking the bank.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230139/smartphone-004_wk6qej.avif",
    features: [
      "6.5-inch 90Hz LCD display",
      "Quad camera system",
      "5000mAh long-lasting battery",
      "Fast charging support",
      "Expandable storage"
    ],
    inStock: true
  },
  {
    id: "smartphones-005",
    name: "Fold X Pro",
    category: "smartphones",
    price: 1299.99,
    rating: 4.5,
    reviewCount: 87,
    description: "Experience the future of smartphones with this innovative folding design. Use it as a compact phone or unfold it into a tablet-sized screen for immersive viewing and multitasking.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230107/smartphone-005_mazulo.avif",
    features: [
      "7.6-inch folding AMOLED display",
      "4.6-inch cover display",
      "Triple camera system",
      "App Continuity between screens",
      "S Pen compatible"
    ],
    inStock: true
  },
  {
    id: "accessories-001",
    name: "Premium Wireless Mouse",
    category: "accessories",
    price: 49.99,
    rating: 4.4,
    reviewCount: 67,
    description: "Enhance your workflow with this ergonomic wireless mouse. Featuring precision tracking, customizable buttons, and long battery life for uninterrupted productivity.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230036/accessories-001_esvtsr.avif",
    features: [
      "Ergonomic design",
      "4000 DPI precision tracking",
      "6 programmable buttons",
      "6-month battery life",
      "Multi-device connectivity"
    ],
    inStock: true
  },
  {
    id: "accessories-002",
    name: "Mechanical Keyboard RGB",
    category: "accessories",
    price: 89.99,
    rating: 4.7,
    reviewCount: 113,
    description: "Experience tactile feedback and precision with this mechanical keyboard. Featuring customizable RGB lighting, programmable keys, and durable construction for gaming and typing enthusiasts.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230107/accessories-002_vhoxhp.avif",
    features: [
      "Cherry MX switches",
      "Full RGB backlighting",
      "N-key rollover",
      "Customizable macros",
      "Detachable wrist rest"
    ],
    inStock: true
  },
  {
    id: "accessories-003",
    name: "UltraView 27\" Monitor",
    category: "accessories",
    price: 349.99,
    rating: 4.6,
    reviewCount: 89,
    description: "Expand your visual workspace with this 27-inch 4K monitor. Featuring vibrant colors, wide viewing angles, and eye-care technology for comfortable all-day use.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230050/accessories-003_eaplhj.avif",
    features: [
      "27-inch 4K UHD display",
      "99% sRGB color accuracy",
      "Eye-care technology",
      "Adjustable height and tilt",
      "Multiple connectivity options"
    ],
    inStock: true
  },
  {
    id: "accessories-004",
    name: "PowerHub USB-C Dock",
    category: "accessories",
    price: 79.99,
    rating: 4.5,
    reviewCount: 72,
    description: "Expand your connectivity options with this versatile USB-C dock. Connect multiple displays, USB devices, and charge your laptop all through a single cable.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230075/accessories-004_wmofc8.avif",
    features: [
      "11-in-1 connectivity",
      "Dual 4K display support",
      "100W Power Delivery",
      "Gigabit Ethernet",
      "SD and microSD card readers"
    ],
    inStock: true
  },
  {
    id: "accessories-005",
    name: "ComfortPro Ergonomic Chair",
    category: "accessories",
    price: 249.99,
    rating: 4.8,
    reviewCount: 58,
    description: "Enhance your comfort during long work sessions with this ergonomic office chair. Featuring adjustable lumbar support, breathable mesh back, and customizable armrests for optimal positioning.",
    imageSrc: "https://res.cloudinary.com/dnhduqv8j/image/upload/v1747230119/accessories-005_juetmu.avif",
    features: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "3D adjustable armrests",
      "Weight-activated tilt mechanism",
      "5-year warranty"
    ],
    inStock: true
  }
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
    
    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log('Existing products deleted');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products imported successfully`);
    
    // Group and count products by category
    const categoryCounts = {};
    products.forEach(product => {
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