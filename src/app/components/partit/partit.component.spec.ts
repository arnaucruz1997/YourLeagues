import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitComponent } from './partit.component';

describe('PartitComponent', () => {
  let component: PartitComponent;
  let fixture: ComponentFixture<PartitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
