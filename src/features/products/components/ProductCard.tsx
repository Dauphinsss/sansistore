import type { Product } from '../services/productService';
import { ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceValue = product.price || 0;
  const offerPriceValue = product.offerPrice || 0;
  const effectivePriceValue = product.hasOffer ? (offerPriceValue > 0 ? offerPriceValue : priceValue) : priceValue;

  return (
    <div className="group h-full bg-card-light rounded-lg border border-border-light overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-bg-light overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-action/10">
            <ShoppingBag className="w-12 h-12 text-primary/30" />
          </div>
        )}


      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-full">


        {/* Name */}
        <h3 className="font-semibold text-text-light line-clamp-2 mb-2 flex-grow">
          {product.name}
        </h3>



        {/* Price */}
        <div className="mb-3">
          {product.hasOffer && product.offerPrice && product.offerPrice > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                Bs. {product.offerPrice.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm line-through text-text-light/50">
                Bs. {product.price.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-text-light">
              Bs. {(product.price || 0).toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={!product.stock || product.stock === 0}
          className="w-full py-2 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed 
                     text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag size={18} />
          Agregar
        </button>
      </div>
    </div>
  );
}
