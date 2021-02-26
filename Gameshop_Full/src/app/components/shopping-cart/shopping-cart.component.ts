import { Component, OnInit } from '@angular/core';
import { Order, OrderDetail, User } from '../../domainclasses';
import { CartItem, CartService } from '../../services/cart.service';
import { CommonService } from '../../services/common.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private orderService: OrderService, private commonService: CommonService,
    private cartService: CartService) { }

  errorMessage = '';
  successMessage = '';
  items!: CartItem[];
  user: User = new User();

  ngOnInit(): void {
      this.items = this.cartService.items;
  }

  getTotal() {
      return this.items.map(i => i.qty * i.game.price!).reduce((a,b) => a + b, 0);
  }

  removeItem(item: CartItem) {
      this.cartService.remove(item.game.id);
  }

  onQtyChanged(item: CartItem) {
      this.cartService.save();
  }

  order() {
      const order = new Order();
      order.user = this.user;
      order.details = this.items.map(i => {          
          return {
            idGame : i.game.id,
            quantity : i.qty,
            unitprice : i.game.price,
            id : 0,
            idOrder : 0
          }
      });
      this.orderService.create(order).subscribe(
          () => {
            this.successMessage = 'Order successfully created';
            this.cartService.clear();
          } ,
          err => this.errorMessage = this.commonService.getError(err)
      )
  }

}
