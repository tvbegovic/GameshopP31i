import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAdminEditComponent } from './game-admin-edit.component';

describe('GameAdminEditComponent', () => {
  let component: GameAdminEditComponent;
  let fixture: ComponentFixture<GameAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAdminEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
