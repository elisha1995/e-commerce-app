import { produce } from 'immer';
import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Toaster } from './services/toaster';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      {
        id: 'prod-1',
        name: 'Midnight Blue Denim Jacket',
        description: 'Classic fit denim jacket with a soft fleece lining for cooler evenings.',
        price: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        reviewsCount: 128,
        inStock: true,
        category: 'apparel',
      },
      {
        id: 'prod-2',
        name: 'Olive Canvas Backpack',
        description: 'Durable 24L backpack with padded laptop sleeve and water-resistant finish.',
        price: 74.5,
        imageUrl:
          'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
        rating: 4.4,
        reviewsCount: 86,
        inStock: true,
        category: 'accessories',
      },
      {
        id: 'prod-3',
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Over-ear Bluetooth headphones with 30-hour battery life and quick charge.',
        price: 219,
        imageUrl:
          'https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviewsCount: 402,
        inStock: false,
        category: 'electronics',
      },
      {
        id: 'prod-4',
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated 24oz bottle that keeps drinks cold for 24 hours and hot for 12.',
        price: 29.95,
        imageUrl:
          'https://images.unsplash.com/photo-1563371351-e53ebb744a1f?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviewsCount: 215,
        inStock: true,
        category: 'outdoors',
      },
      {
        id: 'prod-5',
        name: 'Minimalist Leather Wallet',
        description: 'Slim RFID-blocking wallet crafted from full-grain leather.',
        price: 54,
        imageUrl:
          'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
        rating: 4.3,
        reviewsCount: 64,
        inStock: true,
        category: 'accessories',
      },
      {
        id: 'prod-6',
        name: 'Smart Fitness Tracker',
        description: 'Water-resistant tracker with heart-rate monitoring and sleep insights.',
        price: 129.99,
        imageUrl:
          'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        reviewsCount: 309,
        inStock: true,
        category: 'electronics',
      },
      {
        id: 'prod-7',
        name: 'Ceramic Espresso Set',
        description: 'Four-piece handcrafted espresso cup set with matching saucers.',
        price: 42,
        imageUrl:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
        rating: 4.2,
        reviewsCount: 58,
        inStock: false,
        category: 'home',
      },
      {
        id: 'prod-8',
        name: 'Bamboo Fiber Throw Blanket',
        description: 'Lightweight, breathable throw blanket woven from sustainable bamboo fibers.',
        price: 67.5,
        imageUrl:
          'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        reviewsCount: 142,
        inStock: true,
        category: 'home',
      },
      {
        id: 'prod-9',
        name: 'LED Desk Lamp with USB',
        description:
          'Adjustable lamp with touch controls, 5 brightness levels, and USB charging port.',
        price: 48.75,
        imageUrl:
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        rating: 4.1,
        reviewsCount: 97,
        inStock: true,
        category: 'office',
      },
      {
        id: 'prod-10',
        name: 'Portable Bluetooth Speaker',
        description: 'Compact speaker with rich bass, IPX5 water resistance, and 12-hour playback.',
        price: 59.99,
        imageUrl:
          'https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=800&q=80',
        rating: 4.4,
        reviewsCount: 188,
        inStock: true,
        category: 'electronics',
      },
    ],
    category: 'all',
    wishlistItems: [],
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') return products();
      return products().filter((p) => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
  })),
  withMethods((store, toaster = inject(Toaster)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.some((p) => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success(`${product.name} added to wishlist!`);
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
      });
      toaster.success(`${product.name} removed from wishlist!`);
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
      toaster.success('Wishlist cleared!');
    },
  }))
);
