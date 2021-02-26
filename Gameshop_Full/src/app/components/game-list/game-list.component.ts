import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../domainclasses';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(private cartService: CartService) { }
  _games!: Game[];

  @Input()  
  public get games() : Game[] {
      return this._games;
  }
  
  public set games(v : Game[]) {
      this._games = v;
      if(v) {
        this.pagedGames = v.length > this.pageSize ? v.slice(0,this.pageSize) : v;
      }      
  }
  
  
  page = 1;
  pageSize = 12;
  pagedGames!: Game[];

  ngOnInit(): void {
  }

  pageChanged(event: any) {
      this.page = event.page;
      const start = (this.page - 1)*this.pageSize;
      this.pagedGames = this.games.slice(start, Math.min(start + this.pageSize, this.games.length) );
  }

  onAddedToCart(game: Game) {
    this.cartService.add(game);
  }

}
