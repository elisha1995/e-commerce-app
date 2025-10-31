import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatIcon, MatButton],
  template: `
    <div
      class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <img [src]="product().imageUrl" class="w-full h-[300px] object-cover rounded-t-xl" />

      <ng-content />

      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">{{ product().description }}</p>

        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'In stock' : 'Out of stock' }}
        </div>

        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">\${{ product().price }}</span>
          <button
            matButton="filled"
            class="flex items-center gap-2"
            (click)="addToCartClicked.emit(product())"
            [disabled]="!product().inStock"
          >
            <mat-icon>shopping_cart</mat-icon>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {
  product = input.required<Product>();

  addToCartClicked = output<Product>();

  
}
