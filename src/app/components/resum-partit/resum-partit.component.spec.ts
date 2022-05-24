import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumPartitComponent } from './resum-partit.component';

describe('ResumPartitComponent', () => {
  let component: ResumPartitComponent;
  let fixture: ComponentFixture<ResumPartitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumPartitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumPartitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
