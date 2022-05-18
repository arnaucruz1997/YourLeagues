import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCompetitionsListComponent } from './team-competitions-list.component';

describe('TeamCompetitionsListComponent', () => {
  let component: TeamCompetitionsListComponent;
  let fixture: ComponentFixture<TeamCompetitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCompetitionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCompetitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
