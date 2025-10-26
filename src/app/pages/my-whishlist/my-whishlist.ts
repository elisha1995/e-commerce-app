import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";

@Component({
  selector: 'app-my-whishlist',
  imports: [BackButton],
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button label="Continue Shopping" [navigateTo]="'/products/all'"></app-back-button>
    </div>
  `,
  styles: ``
})
export default class MyWhishlist {

}
