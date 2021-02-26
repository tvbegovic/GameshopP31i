import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../domainclasses';
import { CommonService } from '../../services/common.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  constructor(private gameService: GameService, 
    private activatedRoute: ActivatedRoute, private commonService: CommonService) { }

  errorMessage = '';  
  game!: Game;

  ngOnInit(): void {
      const id=+this.activatedRoute.snapshot.params.id;      
      this.gameService.getById(id).subscribe(
          data => this.game = data,
          err => this.errorMessage = this.commonService.getError(err)
      )
  }

}
