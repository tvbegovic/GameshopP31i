import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSelectorComponent } from './genre-selector.component';

describe('GameTypeSelectorComponent', () => {
  let component: GenreSelectorComponent;
  let fixture: ComponentFixture<GenreSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
