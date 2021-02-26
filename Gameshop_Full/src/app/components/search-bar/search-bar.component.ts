import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  text = '';

  ngOnInit(): void {
  }

  @Output()
  SearchActivated = new EventEmitter();

  search() {
    this.SearchActivated.emit(this.text);
  }

}
