import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/product';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  template: `
    <button
      class=" !bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
      [class]="isInWhishlist() ? '!text-red-500' : '!text-gray-400'"
      matIconButton
      (click)="toggleWishlist(product())"
    >
      <mat-icon>{{ isInWhishlist() ? 'favorite' : 'favorite_border' }}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {
  product = input.required<Product>();
  
  store = inject(EcommerceStore);

  isInWhishlist = computed(() =>
    this.store.wishlistItems().some((item) => item.id === this.product().id)
  );

  toggleWishlist(product: Product) {
    if (this.isInWhishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
