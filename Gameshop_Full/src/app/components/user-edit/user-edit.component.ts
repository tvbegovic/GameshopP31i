import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../domainclasses';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  @Input()
  user!: User;

  ngOnInit(): void {
  }

}
