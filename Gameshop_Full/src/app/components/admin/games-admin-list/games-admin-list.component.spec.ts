import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesAdminListComponent } from './games-admin-list.component';

describe('GamesAdminListComponent', () => {
  let component: GamesAdminListComponent;
  let fixture: ComponentFixture<GamesAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
