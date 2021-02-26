import { Component, OnInit } from '@angular/core';
import { Company, Game, Genre } from '../../domainclasses';
import { HomeModel } from '../../modelclasses';
import { CommonService } from '../../services/common.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService, private commonService: CommonService) { }

  homeModel: HomeModel = new HomeModel();
  games!: Game[];
  errorMessage = '';

  ngOnInit(): void {
      /*this.gameService.getHomeModel().subscribe(
          data => this.homeModel = data,
          err => this.errorMessage = this.commonService.getError(err)
      )*/
      this.gameService.getGenres().subscribe( 
          data => this.homeModel.genres = data
      );
      this.gameService.getCompanies().subscribe(
          data => this.homeModel.companies = data
      );
  }

  onGenreSelected(g: Genre) {
    this.gameService.getByGenre(g.id).subscribe(
        data => this.games = data,
        err => this.errorMessage = this.commonService.getError(err)
    );  
  }

  onCompanySelected(c: Company) {
    this.gameService.getByCompany(c.id).subscribe(
        data => this.games = data,
        err => this.errorMessage = this.commonService.getError(err)
    );
  }

  onSearch(text: string) {
      this.gameService.search(text).subscribe(
        data => this.games = data,
        err => this.errorMessage = this.commonService.getError(err)
    );
  }

}
