import { initializeApp } from 'firebase/app';
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { categories, catalogProducts } from '../seed/catalog-data.mjs';

const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

for (const [key, value] of Object.entries(firebaseConfig)) {
  if (!value && key !== 'measurementId') {
    throw new Error(`Missing Firebase env var for ${key}`);
  }
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function reviewId(productId, index) {
  return `${productId}-review-${index + 1}`;
}

async function main() {
  console.log(`Syncing ${categories.length} categories and ${catalogProducts.length} products to Firestore project ${firebaseConfig.projectId}...`);

  for (const category of categories) {
    await setDoc(doc(db, 'categories', category.id), {
      name: category.name,
      active: category.active,
      createdBy: 'direct-seed',
      createdAt: serverTimestamp(),
    }, { merge: true });
    console.log('Upserted category', category.id);
  }

  for (const product of catalogProducts) {
    await setDoc(doc(db, 'products', product.id), {
      categoryId: product.category,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      active: true,
      hasOffer: product.hasOffer ?? false,
      offerPrice: product.offerPrice ?? null,
      badge: product.badge ?? null,
      sourceUrl: product.sourceUrl,
      createdBy: 'direct-seed',
      createdAt: serverTimestamp(),
    }, { merge: true });
    console.log('Upserted product', product.id);

    await setDoc(doc(db, 'inventory', product.id), {
      productId: product.id,
      stockTotal: 100,
      stockAvailable: 100,
      stockReserved: 0,
      minStock: 5,
      enabled: true,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log('Upserted inventory', product.id);

    for (const [index, review] of product.reviews.entries()) {
      const currentReviewId = reviewId(product.id, index);
      await setDoc(doc(db, 'reviews', currentReviewId), {
        productId: product.id,
        authorName: review.authorName,
        rating: review.rating,
        comment: review.comment,
        active: true,
        createdBy: 'direct-seed',
        createdAt: serverTimestamp(),
      }, { merge: true });
      console.log('Upserted review', currentReviewId);
    }
  }

  console.log('Direct Firestore sync complete');
}

main().catch((error) => {
  console.error('Direct Firestore sync failed');
  console.error(error);
  process.exit(1);
});
