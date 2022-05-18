import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCompetitionComponent } from './join-competition.component';

describe('JoinCompetitionComponent', () => {
  let component: JoinCompetitionComponent;
  let fixture: ComponentFixture<JoinCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
