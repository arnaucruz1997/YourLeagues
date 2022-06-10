import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDatePartitComponent } from './update-date-partit.component';

describe('UpdateDatePartitComponent', () => {
  let component: UpdateDatePartitComponent;
  let fixture: ComponentFixture<UpdateDatePartitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDatePartitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDatePartitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
