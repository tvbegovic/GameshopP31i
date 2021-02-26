import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../domainclasses';

@Component({
  selector: 'app-company-selector',
  templateUrl: './company-selector.component.html',
  styleUrls: ['./company-selector.component.css']
})
export class CompanySelectorComponent implements OnInit {

  constructor() { }

  @Input()
  companies!: Company[];

  @Output()
  CompanySelected = new EventEmitter();

  ngOnInit(): void {
  }

  onCompanySelected(c: Company) {
    this.CompanySelected.emit(c);
  }

}
