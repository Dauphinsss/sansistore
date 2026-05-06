import admin from 'firebase-admin';

// Minimal test dataset for Playwright tests
export const testCategories = [
  { id: 'test-lacteos', name: 'Lacteos', active: true },
  { id: 'test-bebidas', name: 'Bebidas', active: true },
];

export const testProducts = [
  {
    id: 'test-product-in-stock',
    slug: 'leche-test-instock',
    category: 'test-lacteos',
    name: 'Leche Test In Stock',
    price: 9.99,
    description: 'Test product with inventory available',
    imageUrl: 'https://via.placeholder.com/400?text=Leche+Test',
    badge: 'Nuevo',
    stockTotal: 20,
    stockAvailable: 15,
    hasOffer: false,
    offerPrice: null,
    sourceUrl: 'https://example.com/test-product-1',
    reviews: [
      {
        id: 'test-review-1',
        authorName: 'Test User 1',
        rating: 5,
        comment: 'Great test product!',
      },
      {
        id: 'test-review-2',
        authorName: 'Test User 2',
        rating: 4,
        comment: 'Good quality',
      },
    ],
  },
  {
    id: 'test-product-out-of-stock',
    slug: 'queso-test-outofstock',
    category: 'test-lacteos',
    name: 'Queso Test Out of Stock',
    price: 32.5,
    description: 'Test product without inventory',
    imageUrl: 'https://via.placeholder.com/400?text=Queso+Test',
    badge: null,
    stockTotal: 10,
    stockAvailable: 0,
    hasOffer: false,
    offerPrice: null,
    sourceUrl: 'https://example.com/test-product-2',
    reviews: [],
  },
  {
    id: 'test-product-with-offer',
    slug: 'mocochinchi-test-offer',
    category: 'test-bebidas',
    name: 'Mocochinchi Test with Offer',
    price: 10.0,
    description: 'Test product with special offer',
    imageUrl: 'https://via.placeholder.com/400?text=Mocochinchi+Test',
    badge: 'Oferta',
    stockTotal: 25,
    stockAvailable: 12,
    hasOffer: true,
    offerPrice: 7.99,
    sourceUrl: 'https://example.com/test-product-3',
    reviews: [
      {
        id: 'test-review-3',
        authorName: 'Test User 3',
        rating: 5,
        comment: 'Best offer!',
      },
    ],
  },
];

export async function run({ adminApp, db }) {
  const firestore = db;

  // Clear existing test data
  console.log('Clearing test collections...');
  const collectionsToClean = ['categories', 'products', 'inventory', 'reviews'];
  for (const col of collectionsToClean) {
    const snapshot = await firestore.collection(col).get();
    for (const doc of snapshot.docs) {
      await doc.ref.delete();
    }
  }

  console.log('Seeding test categories...');
  const categoryMap = {};
  for (const c of testCategories) {
    const docRef = firestore.collection('categories').doc(c.id);
    await docRef.set({
      name: c.name,
      active: c.active,
      createdBy: 'test-seeder',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    categoryMap[c.id] = docRef.id;
    console.log('Created test category:', docRef.id);
  }

  console.log('Seeding test products, inventory & reviews...');
  for (const p of testProducts) {
    const docRef = firestore.collection('products').doc(p.id);
    await docRef.set({
      categoryId: categoryMap[p.category],
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl,
      active: true,
      hasOffer: p.hasOffer ?? false,
      offerPrice: p.offerPrice ?? null,
      badge: p.badge ?? null,
      sourceUrl: p.sourceUrl,
      createdBy: 'test-seeder',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const productId = docRef.id;
    console.log('Created test product:', productId);

    const invRef = firestore.collection('inventory').doc(productId);
    await invRef.set({
      productId,
      stockTotal: p.stockTotal,
      stockAvailable: p.stockAvailable,
      stockReserved: 0,
      minStock: 5,
      enabled: p.stockAvailable > 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Created test inventory for:', productId);

    for (const review of p.reviews) {
      const reviewRef = firestore.collection('reviews').doc(review.id);
      await reviewRef.set({
        productId,
        authorName: review.authorName,
        rating: review.rating,
        comment: review.comment,
        active: true,
        createdBy: 'test-seeder',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('Created test review:', review.id);
    }
  }

  console.log('test-data seeder complete');
}
