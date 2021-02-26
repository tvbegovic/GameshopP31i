import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../domainclasses';

@Component({
  selector: 'app-game-list-element',
  templateUrl: './game-list-element.component.html',
  styleUrls: ['./game-list-element.component.css']
})
export class GameListElementComponent implements OnInit {

  constructor() { }

  @Input()
  game!: Game;
  @Output()
  AddedToCart = new EventEmitter();

  ngOnInit(): void {
  }

  getImageUrl(game: Game) {
      return `assets/gameimages/${game.image}`
  }
  getImageUrlBg(game: Game) {
      return `background: url("assets/gameimages/${game.image}") center center / 100% 150px no-repeat;`
  }

  addToCart() {
    this.AddedToCart.emit(this.game);
  }

}
