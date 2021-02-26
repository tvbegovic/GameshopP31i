import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridButton, GridButtonEventData, GridColumn, GridColumnType, GridDefinition, GridEditMode, GridEditorType, MessageBoxCommand, MessageBoxCommandValue, MessageboxService, MessageBoxType } from 'bbit-angular-shared';
import { ignoreElements } from 'rxjs/operators';
import { Game } from '../../../domainclasses';
import { GameListModel } from '../../../modelclasses';
import { CommonService } from '../../../services/common.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-games-admin-list',
  templateUrl: './games-admin-list.component.html',
  styleUrls: ['./games-admin-list.component.css']
})
export class GamesAdminListComponent implements OnInit {

  constructor(private gameService: GameService, private commonService: CommonService,
    private messageBoxService: MessageboxService,
    private router: Router) { }

  model!: GameListModel;
  errorMessage = '';
  gameCopy!: Game;
  editMode = GridEditMode.NoEdit;
  editedId = 0;

  definition = new GridDefinition(
      [
        new GridColumn('Id', 'id', GridColumnType.Label, 'title'),
          new GridColumn('Title', 'title', GridColumnType.Label, 'title'),
          new GridColumn('Genre', 'genre.name', GridColumnType.Label, 'genre'),
          new GridColumn('Publisher', 'publisher.name', GridColumnType.Label, 'publisher'),
          new GridColumn('Developer', 'developer.name', GridColumnType.Label, 'developer'),
          new GridColumn('Price', 'price', GridColumnType.Label, 'price'),
          new GridColumn('Release date', 'releaseDate', GridColumnType.Label, 'releaseDate'),
          new GridColumn('buttons', '', GridColumnType.ButtonGroup, 'buttons', null, undefined, undefined, null, false, undefined, null, undefined, false,
          undefined,
          [
            /*new GridButton('Update', 'update', 'fa fa-check', 'btn-success', true),
            new GridButton('Cancel', 'cancel', 'fa-times-circle-o', 'btn-warning ml-2'),*/
            new GridButton('Edit', 'edit', 'fa-pencil', 'btn-secondary'),
            new GridButton('Delete', 'delete', 'fa-remove', 'btn-danger ml-2')            
          ])
      ]
  );

  ngOnInit(): void {
     
    this.gameService.getListModel().subscribe(
        data => {
            this.model = data;
            //this.postSetupGrid();
        } ,
        err => this.errorMessage = this.commonService.getError(err)
    )
  }

  postSetupGrid() {
    
    this.definition.columnButtonVisibilityCallback = this.checkColumnButtonVisibility.bind(this);        
    this.definition.columnEditorVisibilityStatusCallback = this.checkColumnEditorVisibilityStatus.bind(this);
    const genreCol = this.definition.getColumn('genre');
    genreCol.editorType = GridEditorType.Dropdown;
    genreCol.dropdownData = this.model.genres;
    genreCol.valueField = 'id';
    genreCol.displayField = 'name';
    genreCol.selectedValueField = 'idGenre';
    const publisherCol = this.definition.getColumn('publisher');
    publisherCol.editorType = GridEditorType.Dropdown;
    publisherCol.dropdownData = this.model.companies;
    publisherCol.valueField = 'id';
    publisherCol.displayField = 'name';
    publisherCol.selectedValueField = 'idPublisher';
    const developerCol = this.definition.getColumn('developer');
    developerCol.editorType = GridEditorType.Dropdown;
    developerCol.dropdownData = this.model.companies;
    developerCol.valueField = 'id';
    developerCol.displayField = 'name';
    developerCol.selectedValueField = 'idDeveloper';

    
  }
  addNew() {
    /*this.gameCopy = JSON.parse(JSON.stringify(new Game()));
    this.gameCopy.id = 0;
    this.editMode = GridEditMode.AddNew;
    this.editedId = 0;*/
    this.router.navigate(['admin/game/0']);
  }

  gridButtonClicked($event: GridButtonEventData) {
    
    if ($event.name === 'delete') {
      this.onDeleteRow($event.row);
    } else if ($event.name === 'edit') {
      this.onEditRow($event.row);
      this.editMode = GridEditMode.Edit;

    } else if ($event.name === 'cancel') {
      this.editMode = GridEditMode.NoEdit;
    } else if ($event.name === 'update') {
      this.onUpdateRow();
    }
  }

  onEditRow(game: Game) {
    /*this.gameCopy = JSON.parse(JSON.stringify(game));    
    this.editedId = game.id;*/
    this.router.navigate(['admin/game/' + game.id.toString()]);
  }

  onCancelRow() {
    this.editedId = -1;
  }
  onUpdateRow() {
    
    const game = this.gameCopy;
    game.genre = null;
    game.publisher = null;
    game.developer = null;
    //Fix JSON validation
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
        let objG = g;
        if (isNew) {
            this.model.games.unshift(g);
        } else {
            const existing = this.model.games.find(us => us.id === game.id);
            if (existing != null) {
            Object.assign(existing, g);
            }
            objG = existing!;
        }
        objG.genre = this.model.genres.find(x => x.id == g.idGenre)!;
        objG.developer = this.model.companies.find(x => x.id == g.idDeveloper)!;
        objG.publisher = this.model.companies.find(x => x.id == g.idPublisher)!;

        this.editMode = GridEditMode.NoEdit;      
        },
        err => this.errorMessage = this.commonService.getError(err)
    );

  }
  onDeleteRow(game: Game) {
    this.messageBoxService.openDialog('Delete game?', MessageBoxType.Yesno).subscribe((m: MessageBoxCommand) => {
      if (m.value === MessageBoxCommandValue.Ok) {
        this.errorMessage = '';
        this.gameService.delete(game.id).subscribe( data => {
          const index = this.model.games.findIndex(u => u.id === game.id);
          if (index >= 0) {
            this.model.games.splice(index, 1);
          }
          
        },
        err => this.errorMessage = this.commonService.getError(err));

      }
    });

  }

  checkColumnButtonVisibility(g: Game, column: string, button: string) {

    if (button === 'edit') {
      return this.editMode === GridEditMode.NoEdit || g.id !== this.gameCopy.id ;
    } else if (button === 'delete') {
      return this.editMode === GridEditMode.NoEdit || g.id !== this.gameCopy.id ;
    } else if (button === 'update' || button === 'cancel') {
      return this.editMode !== GridEditMode.NoEdit && g.id === this.gameCopy.id;
    }
    return true;
  }

  checkColumnEditorVisibilityStatus(g: Game, column: GridColumn) {
    return column.name != 'id';
  }
  

}
