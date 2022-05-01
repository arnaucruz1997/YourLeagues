import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTeamComponent } from './accept-team.component';

describe('AcceptTeamComponent', () => {
  let component: AcceptTeamComponent;
  let fixture: ComponentFixture<AcceptTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
