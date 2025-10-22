import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink],
  template: `
    <div class="flex item-center gap-2">
      <button matIconButton routerLink="/whishlist">
        <mat-icon>favorite</mat-icon>
      </button>
      <button matIconButton>
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>Sign In</button>
      <button matButton="filled">Sign Up</button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {}
