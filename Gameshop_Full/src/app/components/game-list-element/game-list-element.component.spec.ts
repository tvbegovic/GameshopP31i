import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListElementComponent } from './game-list-element.component';

describe('GameListElementComponent', () => {
  let component: GameListElementComponent;
  let fixture: ComponentFixture<GameListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
