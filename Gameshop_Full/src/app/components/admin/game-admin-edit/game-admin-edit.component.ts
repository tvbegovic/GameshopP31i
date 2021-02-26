import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameEditModel } from '../../../modelclasses';
import { CommonService } from '../../../services/common.service';
import { GameService } from '../../../services/game.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FileUploaderEventData, FileUploaderEventType, FileUploaderHttpOptions, FileUploadOptions } from '../../fileupload/fileupload.component';
import { Settings } from '../../../services/settings';
import { Game } from '../../../domainclasses';

@Component({
  selector: 'app-game-admin-edit',
  templateUrl: './game-admin-edit.component.html',
  styleUrls: ['./game-admin-edit.component.css']
})
export class GameAdminEditComponent implements OnInit {

  constructor(private gameService: GameService, private commonService: CommonService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private localeService: BsLocaleService) {
        const httpOptions = new FileUploaderHttpOptions();
        Object.assign(httpOptions, {
        method: 'POST',
        url: 'api/game/uploadImage',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(Settings.accessTokenKey)!}
        });
        this.uploaderOptions.httpOptions = httpOptions;
        this.uploaderOptions.buttonText = 'Upload image';
     }

    model!: GameEditModel;
    errorMessage = '';
    uploaderOptions = new FileUploadOptions();

  ngOnInit(): void {
    this.localeService.use('hr');
    const id = +this.activatedRoute.snapshot.params.id;
    this.gameService.getEditModel(id).subscribe(
        (data) => {
            this.model = data;
            if(this.model.game.releaseDate) {
                this.model.game.releaseDate = new Date(this.model.game.releaseDate);
            }            
        },
        err => this.errorMessage = this.commonService.getError(err)
    )
  }

  onUploadEvent(event: FileUploaderEventData) : void {
    if (event.type === FileUploaderEventType.Uploaded) {
    
      this.model.game.fileId = event.file.id;

    }
  }

  save() {
      const game = this.model.game;
    if(game.idGenre) {
        game.idGenre = parseInt(game.idGenre.toString());
    }
    if(game.idPublisher) {
        game.idPublisher = parseInt(game.idPublisher.toString());
    }
    if(game.idDeveloper) {
        game.idDeveloper = parseInt(game.idDeveloper.toString());
    }
    if(game.price) {
        game.price = parseFloat(game.price.toString());
    }
    const isNew = game.id === 0;
    this.errorMessage = '';
    
    const method = (isNew ? this.gameService.create : this.gameService.update).bind(this.gameService);
    method(game).subscribe( (g: Game) => {
        this.errorMessage = '';
        this.router.navigate(['admin']);
        },
        err => this.errorMessage = this.commonService.getError(err)
    );
  }

  back() {
      this.router.navigate(['admin']);
  }

  getImageUrl() {
      if(this.model) {
        if(this.model?.game?.fileId) {
            return `assets/tmpImages/${this.model.game.fileId}.jpg`;
        } else if(this.model?.game?.image) {
            return `assets/gameImages/${this.model.game.image}`;
        }
      }
      
      return '';
  }

}
