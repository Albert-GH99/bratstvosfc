import { query } from './db';

const sampleProducts = [
  {
    name: 'Bratstvo Jersey',
    description: 'Premium cotton jersey with embroidered BD logo',
    price: 89.00,
    stock: 50,
    colors: ['Black', 'White', 'Green'],
  },
  {
    name: 'Limited Edition Sim Card',
    description: 'Collectible Bratstvo branded sim card holder',
    price: 45.00,
    stock: 100,
    colors: ['Standard'],
  },
  {
    name: 'Bratstvo Hoodie',
    description: 'Warm and comfortable with premium embroidery',
    price: 129.00,
    stock: 30,
    colors: ['Black', 'Dark Blue'],
  },
  {
    name: 'Bratstvo Cap',
    description: 'Adjustable cap with embroidered logo',
    price: 55.00,
    stock: 75,
    colors: ['Black', 'White'],
  },
  {
    name: 'Stainless Steel Bottle',
    description: 'Insulated bottle with Bratstvo branding',
    price: 79.00,
    stock: 40,
    colors: ['Stainless'],
  },
  {
    name: 'Bratstvo Sticker Pack',
    description: 'Set of 5 premium vinyl stickers',
    price: 25.00,
    stock: 200,
    colors: ['Assorted'],
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    for (const product of sampleProducts) {
      await query(
        `INSERT INTO products (name, description, price, stock, colors)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (name) DO NOTHING`,
        [product.name, product.description, product.price, product.stock, product.colors]
      );
      console.log(`✅ Added: ${product.name}`);
    }

    console.log('✨ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
