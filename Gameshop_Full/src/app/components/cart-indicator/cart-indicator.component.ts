import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-indicator',
  templateUrl: './cart-indicator.component.html',
  styleUrls: ['./cart-indicator.component.css']
})
export class CartIndicatorComponent implements OnInit {

  constructor(private cartService: CartService) {
      cartService.Changed.subscribe(
          (c: number) => this.count = c
      )
   }

  count = 0;

  ngOnInit(): void {
      this.count = this.cartService.getCount();
  }

}
