import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../../domainclasses';

@Component({
  selector: 'app-genre-selector',
  templateUrl: './genre-selector.component.html',
  styleUrls: ['./genre-selector.component.css']
})
export class GenreSelectorComponent implements OnInit {

  constructor() { }
  
  @Input()
  genres!: Genre[];
  @Output()
  GenreSelected = new EventEmitter();
  
  ngOnInit(): void {
  }

  onGenreSelected(g: Genre) {
    this.GenreSelected.emit(g);
  }

}
