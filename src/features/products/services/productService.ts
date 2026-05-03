import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  category?: string;
  imageUrl?: string;
  active?: boolean;
  hasOffer?: boolean;
  offerPrice?: number;
  stock?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  createdAt?: Date;
}

/**
 * Fetches all active products from Firestore
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    console.log('getAllProducts: Starting to fetch products from Firestore');
    
    // Query all products from the 'products' collection
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection);
    
    console.log('getAllProducts: Executing query...');
    const snapshot = await getDocs(q);
    
    console.log(`getAllProducts: Query returned ${snapshot.docs.length} documents`);
    
    // Map Firestore documents to Product objects
    const products: Product[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        description: data.description,
        price: data.price || 0,
        categoryId: data.categoryId || '',
        category: data.category,
        imageUrl: data.imageUrl,
        active: data.active !== false,
        hasOffer: data.hasOffer || false,
        offerPrice: data.offerPrice,
        stock: data.stock,
        rating: data.rating,
        reviews: data.reviews,
        badge: data.badge,
        createdAt: data.createdAt,
      } as Product;
    });

    console.log('getAllProducts: Successfully fetched and mapped products:', products);
    return products;
  } catch (error) {
    console.error('getAllProducts: Error fetching products from Firestore:', error);
    // Return empty array on error to allow page to still render
    return [];
  }
}

/**
 * Search and filter products
 */
export function filterProducts(
  products: Product[],
  searchQuery: string,
  filters: {
    categories?: string[];
    priceRange?: [number, number];
    onlyOffers?: boolean;
    onlyAvailable?: boolean;
    minRating?: number;
  }
): Product[] {
  let filtered = [...products];

   // Search filter
   if (searchQuery.trim()) {
     const query = searchQuery.toLowerCase();
     filtered = filtered.filter((product) =>
       product.name.toLowerCase().includes(query) ||
       product.description?.toLowerCase().includes(query)
     );

     // Sort by relevance: startsWith > contains, name > description
     const getScore = (product: Product) => {
       const name = product.name.toLowerCase();
       const desc = (product.description || '').toLowerCase();
       if (name.startsWith(query)) return 3;
       if (desc.startsWith(query)) return 2;
       if (name.includes(query)) return 1;
       if (desc.includes(query)) return 1;
       return 0;
     };

     filtered.sort((a, b) => {
       const scoreA = getScore(a);
       const scoreB = getScore(b);
       return scoreB - scoreA; // descending
     });
   }

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((product) =>
      filters.categories!.includes(product.categoryId)
    );
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter((product) => {
      const effectivePrice = product.hasOffer ? product.offerPrice || product.price : product.price;
      return effectivePrice >= min && effectivePrice <= max;
    });
  }

  // Only offers filter
  if (filters.onlyOffers) {
    filtered = filtered.filter((product) => product.hasOffer === true);
  }

  // Only available filter
  if (filters.onlyAvailable) {
    filtered = filtered.filter((product) => product.stock && product.stock > 0);
  }

  // Minimum rating filter
  if (filters.minRating && filters.minRating > 0) {
    filtered = filtered.filter(
      (product) => product.rating && product.rating >= filters.minRating!
    );
  }

  return filtered;
}
